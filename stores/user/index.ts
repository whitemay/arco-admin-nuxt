import type { UserState } from './types'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: undefined,
    avatar: undefined,
    job: undefined,
    organization: undefined,
    location: undefined,
    email: undefined,
    introduction: undefined,
    personalWebsite: undefined,
    jobName: undefined,
    organizationName: undefined,
    locationName: undefined,
    phone: undefined,
    registrationDate: undefined,
    accountId: undefined,
    certification: undefined,
    role: '',
    previousNames: new Set<string>(),
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state }
    },
    usedNames(state: UserState): string[] {
      return Array.from(state.previousNames)
    },
    otherNames(state: UserState) {
      return this.usedNames.filter(name => name !== state.name)
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'admin' : 'user'
        resolve(this.role)
      })
    },
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },

    // Reset user's information
    resetInfo() {
      this.$reset()
    },

    // Get user's information
    async info() {
      const res = await getUserInfo()

      this.setInfo(res.data)
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm)
        setToken(res.data.token)
      }
      catch (err) {
        clearToken()
        throw err
      }
    },
    logoutCallBack() {
      const appStore = useAppStore()
      this.resetInfo()
      clearToken()
      removeRouteListener()
      appStore.clearServerMenu()
    },
    // Logout
    async logout() {
      try {
        await userLogout()
      }
      finally {
        this.logoutCallBack()
      }
    },
    setNewName(name: string) {
      if (this.name)
        this.previousNames.add(this.name)

      this.name = name
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
