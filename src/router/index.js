import { createRouter, createWebHistory } from 'vue-router';

// Importa las vistas por etapa del batch
import FermentationStage from '../batch-management/pages/batch-management-fermentation-stage.component.vue';
import PressingStage from '../batch-management/pages/batch-management-pressing-stage.component.vue';
import ClarificationStage from '../batch-management/pages/batch-management-clarification-stage.component.vue';
import AgingStage from '../batch-management/pages/batch-management-aging-stage.component.vue';
import BottledStage from '../batch-management/pages/batch-management-bottled-stage.component.vue';
import BatchOverview from '../batch-management/pages/batch-management-overview.component.vue';
import NotFound from '../public/pages/page-not-found.component.vue';
import Home from '../public/components/HelloWorld.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/batch-management',
    name: 'BatchManagementOverview',
    component: BatchOverview
  },
  {
    path: '/batch-management/fermentation',
    name: 'FermentationStage',
    component: FermentationStage
  },
  {
    path: '/batch-management/pressing',
    name: 'PressingStage',
    component: PressingStage
  },
  {
    path: '/batch-management/clarification',
    name: 'ClarificationStage',
    component: ClarificationStage
  },
  {
    path: '/batch-management/aging',
    name: 'AgingStage',
    component: AgingStage
  },
  {
    path: '/batch-management/bottled',
    name: 'BottledStage',
    component: BottledStage
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
