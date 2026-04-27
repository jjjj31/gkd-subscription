import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.klcxkj.zqxy',
  name: '趣智校园',
  groups: [
    {
      key: 1001,
      name: '右上角扫码图标',
      activityIds: 'com.klcxkj.zqxy.ui.main.MainActivity',
      rules: [
        {
          key: 1001,
          name: '首页右上角扫码图标',
          snapshotUrls: 'https://i.gkd.li/i/1777273179873',
          matches:
            '[vid="home_title_scan_layout"][clickable=true] > [name="android.widget.ImageView"][desc="趣智校园"]',
          action: 'click',
          matchTime: 10000,
          actionMaximum: 1,
          resetMatch: 'app',
        },
      ],
    },
  ],
});
