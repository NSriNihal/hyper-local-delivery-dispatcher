import { apiUrl } from "./apiUrl"

const USER_STORAGE_KEY = "user"
const TOKEN_STORAGE_KEY = "token"
const AUTH_GUARD_FLAG = "__hyperdispatchAuthGuardInstalled"

const AUTH_ERROR_PATTERNS = [
    /token not found/i,
    /token not verified/i,
    /token expired/i,
    /jwt expired/i,
    /verifytoken error/i,
    /isauth error/i
]

const isAuthFailureMessage = (message) => {
    if (!message || typeof message !== "string") {
        return false
    }

    return AUTH_ERROR_PATTERNS.some((pattern) => pattern.test(message))
}

const redirectToLogin = () => {
    clearAuthSession()

    if (typeof window === "undefined") {
        return
    }

    if (window.location.pathname !== "/login") {
        window.location.replace("/login")
    }
}

export const installAuthRedirectGuard = () => {
    if (typeof window === "undefined" || window[AUTH_GUARD_FLAG]) {
        return
    }

    window[AUTH_GUARD_FLAG] = true

    const originalFetch = window.fetch.bind(window)

    window.fetch = async (...args) => {
        const response = await originalFetch(...args)
        const contentType = response.headers.get("content-type") || ""

        if (contentType.includes("application/json")) {
            const payload = await response.clone().json().catch(() => null)
            if (isAuthFailureMessage(payload?.message)) {
                redirectToLogin()
            }
        }

        return response
    }
}

export const getStoredAuthSession = () => {
    if (typeof window === "undefined") {
        return { user: null, token: "" }
    }

    let user = null
    let token = ""

    try {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY)
        user = storedUser ? JSON.parse(storedUser) : null
    } catch (error) {
        user = null
    }

    try {
        token = localStorage.getItem(TOKEN_STORAGE_KEY) || ""
    } catch (error) {
        token = ""
    }

    return { user, token }
}

export const saveAuthSession = (user, token) => {
    if (typeof window === "undefined") {
        return
    }

    if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
    }

    if (token) {
        localStorage.setItem(TOKEN_STORAGE_KEY, token)
    }
}

export const clearAuthSession = () => {
    if (typeof window === "undefined") {
        return
    }

    localStorage.removeItem(USER_STORAGE_KEY)
    localStorage.removeItem(TOKEN_STORAGE_KEY)
}

export const buildAuthHeaders = (token, headers = {}) => {
    if (!token) {
        return { ...headers }
    }

    return {
        ...headers,
        Authorization: `Bearer ${token}`
    }
}

export const requestJson = async (path, { token, headers, ...options } = {}) => {
    const response = await fetch(apiUrl(path), {
        credentials: "include",
        ...options,
        headers: buildAuthHeaders(token, headers)
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
        const error = new Error(data.message || "Request failed")
        error.status = response.status
        error.data = data
        throw error
    }

    return data
}

export const fetchCurrentUser = async (token) => {
    if (!token) {
        return null
    }

    return requestJson("/user/current", { token })
}

export const signOutRequest = async (token) => {
    try {
        await requestJson("/auth/signout", {
            method: "POST",
            token
        })
    } catch (error) {
        return null
    }

    return null
}
