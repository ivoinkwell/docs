/**
 * 为链接添加 target="_blank"
 * - 文章内容中的外部链接 → 新标签页打开
 * - 社交链接（GitHub、Blog等）→ 新标签页打开
 * - 站内链接 (/ 开头或相对路径) → 当前标签页
 * - 锚点链接 (# 开头) → 当前标签页
 */
(function () {
  function addBlankTarget(a) {
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
  }

  function isExternalLink(href) {
    return href && href.startsWith('http');
  }

  function setupLinks() {
    // 处理文章内容区域的外部链接
    var contentSelector = '.sl-markdown-content a[href], .custom-md a[href]';
    document.querySelectorAll(contentSelector).forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href) return;
      // 跳过锚点链接和站内链接
      if (href.startsWith('#') || href.startsWith('/') || !href.startsWith('http')) return;
      addBlankTarget(a);
    });

    // 处理社交链接（GitHub、Blog等）
    document.querySelectorAll('a[rel="me"][href]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (isExternalLink(href)) {
        addBlankTarget(a);
      }
    });
  }

  // 页面初始加载时处理
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupLinks);
  } else {
    setupLinks();
  }

  // 监听 DOM 变化，处理 Starlight SPA 导航后动态加载的内容
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType === 1) {
          // 处理文章内容链接
          if (node.matches && node.matches('.sl-markdown-content a[href], .custom-md a[href]')) {
            var href = node.getAttribute('href');
            if (isExternalLink(href)) {
              addBlankTarget(node);
            }
          }
          if (node.querySelectorAll) {
            node.querySelectorAll('.sl-markdown-content a[href], .custom-md a[href]').forEach(function (a) {
              var href = a.getAttribute('href');
              if (isExternalLink(href)) {
                addBlankTarget(a);
              }
            });
            // 处理社交链接
            node.querySelectorAll('a[rel="me"][href]').forEach(function (a) {
              var href = a.getAttribute('href');
              if (isExternalLink(href)) {
                addBlankTarget(a);
              }
            });
          }
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
