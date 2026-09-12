export function initHitokoto() {
  const hitokotoElem = document.getElementById('hitokoto_text') as HTMLAnchorElement | null;
  if (!hitokotoElem) return;

  const rule = ["a", "b", "c", "d", "h", "i", "j", "k"];
  const query = rule.map(item => `c=${item}`).join('&');

  function fetchHitokoto() {
    fetch(`https://v1.hitokoto.cn?${query}`)
      .then((response) => response.json())
      .then((data) => {
        if (!hitokotoElem) return;
        hitokotoElem.href = "https://hitokoto.cn/?uuid=" + data.uuid;
        const from = data.from ? " -" + data.from : '';
        hitokotoElem.innerText = data.hitokoto + from;
        localStorage.setItem('lastHitokotoCall', Date.now().toString());
        localStorage.setItem('lastHitokotoResult', JSON.stringify(data));
      })
      .catch(console.error);
  }

  function useLastHitokotoResult() {
    try {
      const dataStr = localStorage.getItem('lastHitokotoResult');
      if (dataStr && hitokotoElem) {
        const data = JSON.parse(dataStr);
        hitokotoElem.href = "https://hitokoto.cn/?uuid=" + data.uuid;
        const from = data.from ? " -" + data.from : '';
        hitokotoElem.innerText = data.hitokoto + from;
      }
    } catch {
      fetchHitokoto();
    }
  }

  function canCallHitokoto(): boolean {
    const lastCall = localStorage.getItem('lastHitokotoCall');
    if (!lastCall) return true;
    const now = Date.now();
    return now - parseInt(lastCall, 10) > 60 * 1000;
  }

  if (canCallHitokoto()) {
    fetchHitokoto();
  } else {
    const lastResult = localStorage.getItem('lastHitokotoResult');
    if (lastResult) {
      useLastHitokotoResult();
    } else {
      fetchHitokoto();
    }
  }
}
