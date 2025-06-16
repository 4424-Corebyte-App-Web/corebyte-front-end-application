<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import LanguageSwitcher from './language-switcher.component.vue'

const { t } = useI18n();

const items = ref([
  {
    separator: true
  },
  {
    items: [
      {
        label: t('navbar.user'),
        icon: 'pi pi-user',
        to: '/profile'
      },
      {
        separator: true
      },
      {
        separator: true
      },
      {
        label: t('navbar.orders'),
        icon: 'pi pi-plus-circle',
        to: '/orders'
      },
      {
        separator: true
      },
      {
        label: t('navbar.batch'),
        icon: 'pi pi-database',
        to: '/batch-management/fermentation'
      },
      {
        separator: true
      },
      {
        separator: true
      },
      {
        label: t('navbar.status'),
        icon: 'pi pi-check-circle',
        to: '/status'
      },
      {
        label: t('navbar.record'),
        icon: 'pi pi-file',
        to: '/record'
      },
      {
        label: t('navbar.alert'),
        icon: 'pi pi-bell',
        to: '/alerts'
      },
      {
        label: t('navbar.analysis'),
        icon: 'pi pi-chart-line',
        to: '/sales-analysis'
      },
      {
        label: t('navbar.replenishment'),
        icon: 'pi pi-refresh',
        to: '/replenishment'
      },
      {
        separator: true
      },
      {
        label: t('navbar.log-out'),
        icon: 'pi pi-sign-out',
        command: () => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/login');
        }
      }
    ]
  },
  {
    separator: true
  }
]);
</script>
<template>

  <div class="custom-sidebar">
    <pv-menu :model="items">
      <template #submenulabel="{ item }">
        <span class="sub-label">{{ item.label }}</span>
      </template>
      <template #item="{ item, props: itemProps }">
        <router-link v-if="item.to" :to="item.to" custom v-slot="{ href, navigate, isActive, isExactActive }">
          <a v-ripple :href="href" @click="navigate" :class="['menu-item', item.class, {'active-link': isActive, 'active-exact-link': isExactActive}]" v-bind="itemProps.action">
            <i :class="[item.icon]" />
            <span>{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple :class="['menu-item', item.class]" @click="item.command?.()" v-bind="itemProps.action">
          <i :class="[item.icon]" />
          <span>{{ item.label }}</span>
        </a>
      </template>
      <template #end>
        <div class="sidebar-end">
          <span class="text-xl font-semibold">COREBYTE 2025</span>
        </div>
      </template>
    </pv-menu>
  </div>
</template>
<style scoped>
.custom-sidebar {
  background-color: #242424;
  display: flex;
  flex-direction: column;
  height: 100vh;
  border: none;
  width: 250px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  transition: background-color 0.2s;
  color: #fff !important;
  border-radius: 25px;
  background-color: #242424;
  width: 100%;
}

.menu-item:hover {
  background-color: #2f2f2f;
}

.menu-item i {
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  color: #fff;
  min-width: 2.5rem;
  text-align: center;
  display: flex;
  align-items: center;
}

.custom-sidebar :deep(.p-menu) {
  background-color: #242424;
  border: none;
  width: 100%;
  height: 100%;
  padding: 1rem;
}

.menu-item i {
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  color: #fff;
  min-width: 2.5rem;
  text-align: center;
}

.sidebar-end {
  margin-top: auto;
  padding: 1rem;
  text-align: center;
  font-size: 0.875rem;
  background-color: #242424;
  color: #fff;
}
</style>
