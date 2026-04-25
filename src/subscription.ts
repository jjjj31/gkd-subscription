import { defineGkdSubscription } from '@gkd-kit/define';
import { batchImportApps } from '@gkd-kit/tools';
import categories from './categories';
import globalGroups from './globalGroups';

export default defineGkdSubscription({
  id: 983147562,
  name: 'jjjj31 的 GKD 订阅',
  version: 0,
  author: 'jjjj31',
  checkUpdateUrl: './gkd.version.json5',
  supportUri: 'https://github.com/jjjj31/gkd-subscription',
  categories,
  globalGroups,
  apps: await batchImportApps(`${import.meta.dirname}/apps`),
});
