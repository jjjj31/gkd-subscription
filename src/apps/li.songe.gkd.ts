import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'li.songe.gkd',
  name: 'GKD',
  groups: [
    {
      key: 1001,
      name: '点击 确定',
      rules: [
        {
          // 请以 snapshots/latest/li.songe.gkd/ 中的快照为准，必要时替换 snapshotUrls 与 matches 中的内容
          name: 'confirm-1',
          // 占位 snapshotUrl，检查需要使用 i.gkd.li 的链接。请使用本地快照提取后上传并替换为合法的 i.gkd.li 链接。
          snapshotUrls: ['https://i.gkd.li/i/0'],
          // 优先使用从快照提取的 vid 或 id；这里使用 matches 字符串作为后备选择器，实际以快照为准
          matches: ['[text="确定"]'],
          action: 'click' as const,
        },
      ],
    },
  ],
});
