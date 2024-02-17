<script lang="ts" setup>
import type { Container } from 'tsparticles-engine'
import type { ValidatedError } from '@arco-design/web-vue/es/form/interface'
import { useStorage } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import LoginBanner from './components/banner.vue'

const { signIn } = useAuth()

const loginForm = ref<HTMLElement | null>(null)

const loginConfig = useStorage('login-config', {
  rememberPassword: true,
  username: 'jsmith', // 演示默认值
  password: 'hunter2', // demo default value
})
const userInfo = reactive({
  username: loginConfig.value.username,
  password: loginConfig.value.password,
})
const { t } = useI18n()
const errorMessage = ref('')
const [loading, { toggle: setLoading }] = useBoolean(false)

definePageMeta({
  layout: 'home',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
  noAffix: true,
})

async function handleLogin({
  errors,
  values,
}: {
  errors: Record<string, ValidatedError> | undefined
  values: Record<string, any>
}) {
  if (loading.value)
    return
  if (!errors) {
    setLoading(true)
    try {
      /* await userStore.login(values as LoginData)
      const { redirect, ...othersQuery } = router.currentRoute.value.query
      router.push({
        name: (redirect as string) || 'Workplace',
        query: {
          ...othersQuery,
        },
      }) */
      await signIn(values, { callbackUrl: '/', external: false })
      useNotify({ type: 'success', config: t('login.form.login.success') })

      const { rememberPassword } = loginConfig.value
      const { username, password } = values
      // 实际生产环境需要进行加密存储。
      // The actual production environment requires encrypted storage.
      loginConfig.value.username = rememberPassword ? username : ''
      loginConfig.value.password = rememberPassword ? password : ''
    }
    catch (err) {
      errorMessage.value = (err as Error).message
    }
    finally {
      setLoading(false)
    }
  }
}

updateAppConfig({ title: 'Login' })

function setRememberPassword(value: boolean) {
  loginConfig.value.rememberPassword = value
}

const options = {
  fullScreen: {
    enable: true,
    zIndex: -1,
  },
  fpsLimit: 60,
  background: {
    color: useColors.primary[8],
  },
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onClick: {
        // 开启鼠标点击的效果
        enable: true,
        mode: 'push',
      },
      onHover: {
        // 开启鼠标悬浮的效果(线条跟着鼠标移动)
        enable: true,
        mode: 'grab',
      },
      resize: true,
    },
    modes: {
      // 配置动画效果
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      grab: {
        distance: 200,
        duration: 0.4,
      },
      attract: {
        // 鼠标悬浮时，集中于一点，鼠标移开时释放产生涟漪效果
        distance: 200,
        duration: 0.4,
        factor: 5,
      },
    },
  },
  particles: {
    color: {
      value: useColors.primary[1], // 粒子点的颜色
    },
    links: {
      color: useColors.primary[1], // 线条颜色
      distance: 150,
      enable: true,
      opacity: 0.5, // 不透明度
      width: 2, // 线条宽度
    },
    collisions: {
      enable: true,
    },
    move: {
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
      bounce: false,
      direction: 'none',
      enable: true,
      out_mode: 'out',
      random: false,
      speed: 1, // 移动速度
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'circle',
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
} as any

function onLoad(container: Container) {
  // Do something with the container
  container.pause()
  setTimeout(() => container.play(), 100)
}
</script>

<template>
  <div class="container h-full flex flex-col">
    <div class="logo">
      <img
        alt="logo"
        src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"
      >
      <div class="logo-text">
        Arco Design Pro
      </div>
    </div>
    <LoginBanner />
    <h1>{{ $t('login.form.login') }}</h1>
    <div class="content">
      <div class="content-inner">
        <a-form
          ref="loginForm"
          :model="userInfo"
          class="login-form"
          layout="vertical"
          @submit="handleLogin"
        >
          <a-form-item
            field="username"
            :rules="[{ required: true, message: $t('login.form.userName.errMsg') }]"
            :validate-trigger="['change', 'blur']"
            hide-label
          >
            <a-input
              v-model="userInfo.username"
              :placeholder="$t('login.form.userName.placeholder')"
            >
              <template #prefix>
                <icon-user />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item
            field="password"
            :rules="[{ required: true, message: $t('login.form.password.errMsg') }]"
            :validate-trigger="['change', 'blur']"
            hide-label
          >
            <a-input-password
              v-model="userInfo.password"
              :placeholder="$t('login.form.password.placeholder')"
              allow-clear
            >
              <template #prefix>
                <icon-lock />
              </template>
            </a-input-password>
          </a-form-item>
          <a-space :size="16" direction="vertical">
            <div class="login-form-password-actions">
              <a-checkbox
                checked="rememberPassword"
                :model-value="loginConfig.rememberPassword"
                @change="setRememberPassword as any"
              >
                {{ $t('login.form.rememberPassword') }}
              </a-checkbox>
              <a-link>{{ $t('login.form.forgetPassword') }}</a-link>
            </div>
            <a-button type="primary" html-type="submit" long :loading="loading">
              {{ $t('login.form.login') }}
            </a-button>
            <a-button type="text" long class="login-form-register-btn">
              {{ $t('login.form.register') }}
            </a-button>
          </a-space>
        </a-form>
      </div>
    </div>
    <nuxt-particles
      id="bgparticles" :options="options"
      @load="onLoad"
    />
  </div>
</template>

<style lang="less" scoped>
.container {
  /*display: flex;
  height: 100vh;*/

  .banner {
    width: 550px;
    height: 350px;
    background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
  }

  .content {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding-bottom: 40px;
  }

  .footer {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
  }
}

.logo {
  position: fixed;
  top: 24px;
  left: 22px;
  z-index: 1;
  display: inline-flex;
  align-items: center;

  &-text {
    margin-right: 4px;
    margin-left: 4px;
    color: var(--color-fill-1);
    font-size: 20px;
  }
}

.login-form {
  &-wrapper {
    width: 320px;
  }

  &-title {
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }

  &-sub-title {
    color: var(--color-text-3);
    font-size: 16px;
    line-height: 24px;
  }

  &-error-msg {
    height: 32px;
    color: rgb(var(--red-6));
    line-height: 32px;
  }

  &-password-actions {
    display: flex;
    justify-content: space-between;
  }

  &-register-btn {
    color: var(--color-text-3) !important;
  }
}

// responsive
@media (max-width: @screen-lg) {
  .container {
    .banner {
      width: 25%;
    }
  }
}
</style>
