// Copyright 2025 chenjjiaa
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, { useEffect, useRef } from 'react';

// 自定义TradingView小部件组件
const TradingViewWidget = ({ 
  symbol = 'BTCUSDT', 
  interval = '60',
  theme = 'dark',
  locale = 'zh_CN',
  autosize = true,
  studies = []
}) => {
  const container = useRef();

  useEffect(() => {
    // 清除容器内容
    if (container.current) {
      container.current.innerHTML = '';
    }

    // 创建TradingView小部件脚本
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (window.TradingView && container.current) {
        new window.TradingView.widget({
          autosize,
          symbol: `BINANCE:${symbol}`,
          interval,
          timezone: 'Asia/Shanghai',
          theme: theme === 'dark' ? 'dark' : 'light',
          style: '1',
          locale,
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: container.current.id,
          studies,
          hide_side_toolbar: false,
          withdateranges: true,
          save_image: true,
        });
      }
    };
    
    // 添加脚本到文档
    document.head.appendChild(script);
    
    // 清理函数
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [symbol, interval, theme, locale, autosize, studies]);

  return (
    <div 
      id={`tradingview_${symbol}`} 
      ref={container} 
      style={{ height: '100%', width: '100%' }}
    />
  );
};

export default TradingViewWidget;