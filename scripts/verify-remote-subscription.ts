import subscription from '../src/subscription';

type Endpoint = {
  name: string;
  url: string;
};

const expectedId = subscription.id;

const endpoints: Endpoint[] = [
  {
    name: 'raw-gkd',
    url: 'https://raw.githubusercontent.com/jjjj31/gkd-subscription/main/dist/gkd.json5',
  },
  {
    name: 'raw-version',
    url: 'https://raw.githubusercontent.com/jjjj31/gkd-subscription/main/dist/gkd.version.json5',
  },
  {
    name: 'jsdelivr-gkd',
    url: 'https://fastly.jsdelivr.net/gh/jjjj31/gkd-subscription@main/dist/gkd.json5',
  },
  {
    name: 'jsdelivr-version',
    url: 'https://fastly.jsdelivr.net/gh/jjjj31/gkd-subscription@main/dist/gkd.version.json5',
  },
];

const readIntegerField = (source: string, field: 'id' | 'version') => {
  const match = source.match(new RegExp(`\\b${field}\\s*:\\s*(\\d+)`));
  if (!match) {
    return null;
  }
  return Number(match[1]);
};

let hasFailure = false;

for (const endpoint of endpoints) {
  try {
    const response = await fetch(endpoint.url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const text = await response.text();
    const remoteId = readIntegerField(text, 'id');
    const remoteVersion = readIntegerField(text, 'version');

    if (remoteId === null || remoteVersion === null) {
      throw new Error('响应中缺少 id/version 字段');
    }
    if (remoteId !== expectedId) {
      throw new Error(`id 不匹配: 远端=${remoteId}, 本地=${expectedId}`);
    }

    console.log(`[OK] ${endpoint.name} version=${remoteVersion}`);
  } catch (error) {
    hasFailure = true;
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[FAIL] ${endpoint.name} ${endpoint.url} -> ${message}`);
  }
}

if (hasFailure) {
  process.exit(1);
}

console.log('远端订阅验证通过');
