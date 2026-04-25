import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.copymanga.app',
  name: '拷貝漫畫',
  groups: [
    {
      key: 1001,
      name: '系统提示-点击确定',
      activityIds: 'com.copymanga.app.MainActivity',
      rules: [
        {
          key: 1001,
          name: '系统提示弹窗-确定按钮',
          snapshotUrls: 'https://i.gkd.li/i/1777108294304',
          matches: [
            '[desc="系统提示"]',
            '[name="android.widget.Button"][desc="确定"][clickable=true]',
          ],
          action: 'click',
          actionMaximum: 1,
          resetMatch: 'activity',
        },
      ],
    },
    {
      key: 1002,
      name: '更新提示-点击取消',
      activityIds: 'com.copymanga.app.MainActivity',
      rules: [
        {
          key: 1002,
          name: '版本更新弹窗-取消按钮',
          snapshotUrls: 'https://i.gkd.li/i/1777108314033',
          matches: [
            '[desc="系統提示"]',
            '[name="android.widget.Button"][desc="取消"][clickable=true]',
          ],
          action: 'click',
          actionMaximum: 1,
          resetMatch: 'activity',
        },
      ],
    },
  ],
});
