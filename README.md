# hexo-tag-mermaid
hexo mermaid插件

依赖 [mermaid](http://knsv.github.io/mermaid) 库

### hexo-tag-gantt 安装

```bash
npm install https://github.com/threeq/hexo-tag-mermaid.git --save
```

### 实例

#### 流程图

```language
{% mermaid flow 流程图 1 %}
    subgraph one
        a1-->a2
    end
    subgraph two
        b1-->b2
    end
    subgraph three
        c1-->c2
    end
    c1-->a2
{% endmermaid %}
```

```language
{% mermaid flow 流程图 2 %}
    B["fa:fa-twitter for peace"]
    B-->C[fa:fa-ban forbidden]
    B-->D(fa:fa-spinner);
    B-->E(A fa:fa-camera-retro perhaps?);
{% endmermaid %}
```

#### 时序图
```language
{% mermaid sequence 时序图 %}
    Alice->>Bob: Hello Bob, how are you?
    alt is sick
        Bob->>Alice: Not so good :(
    else is well
        Bob->>Alice: Feeling fresh like a daisy
    end
    opt Extra response
        Bob->>Alice: Thanks for asking
    end
{% endmermaid %}
```

时序图建议使用[hexo-tag-plantuml](https://github.com/threeq/hexo-tag-plantuml)。里面还有更多的UML图形

#### 甘特图
```language
{% mermaid gantt 测试甘特图 %}
    section section 1
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section section 2
    Task in sec      :2014-01-12  , 12d
    anther task      : 24d
{% endmermaid %}
```

[效果图](http://threeq.me/2015/10/22/hexo-tag-gantt/)

### 语法

[语法信息参考mermaid](http://knsv.github.io/mermaid/#syntax35)