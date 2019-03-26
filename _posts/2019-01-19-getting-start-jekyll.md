---
title: Getting Start Jekyll
tags: [jekyll, blogging]
---
# [Quickstart](https://jekyllrb.com/docs/)

## Instruction

1. 루비 개발환경 설치
2. jekyll 과 bundler 설치
```
gem intall jekyll bundler
```
3. jekyll 사이트 생성
```
jekyll new SITENAME
```
4. directory 변경
```
cd SITENAME
```
5. 사이트를 빌드하고 로컬 서버 구동
```
bundle exec jekyll serve
```
6. `http://localhost:4000` 으로 확인

## Ruby 101
### Gems
루비 프로젝트에 포함할 수 있는 코드. gem 은 기능을 패키징하고 다른 프로젝트나 사람들에게 공유할 수 있게한다. jekyll 은 자체로 gem 이면서 jekyll-feed, jekyll-seo-tag, jekyll-arhives 등을 포함하는 많은 jekyll plugins 이다.

### Gemfile
`Gemfile`은 당신의 사이트에 필요한 gem 목록이다.

### Bundler
bundler 는 `Gemfile`에 있는 gem 을 설치한다. `Gemfile`과 `bundler`를 사용하는 것이 필수는 아니지만 다른 환경에서 같은 버전의 jekyll 과 jekyll plugin 으로 동작하는 것을 보장하기 때문에 사용하는 것을 추천한다.

`gem install bundler` 명령으로 bundler 를 설치한다.

만약 당신이 `Gemfile`을 사용한다면 gem 을 설치하기 위해 처음에 `bundle install` 명령을 실행해야한다. 그 후 `bundle exec jekyll serve` 명령으로 사이트를 빌드한다. 이것은 `Gemfile`에 설정된 gem 버전이 사용되는 것을 보장한다. 만약 `Gemfile` 을 사용하지 않는다면 `jekyll serve` 명령을 사용하면 된다.

## Installation

jekyll 은 대부분의 시스템에 설치할 수 있는 [Ruby Gem](#Gems) 이다.

### Requirements

- Ruby version 2.2.5 이상
- RubyGems
- GCC 와 Make

### Guides

## Community

## Step by Step Tutorial

### 1. [Setup](https://jekyllrb.com/docs/step-by-step/01-setup/)

#### Installation

`gem install jekyll bundler`

#### Create a site

#### Build

Jekyll 은 static site 생성기기 때문에 결과를 보기위해 빌드를 해야한다. 사이트 root 에서 당신의 site 를 빌드하기 위한 두개의 명령어가 있다. 

- `jekyll build` - site 를 빌드하고 결과를 `_site` 디렉토리에 출력한다.
- `jekyll serve` - 변경이 있을 때 마다 새로 빌드하며 결과물을 `http://localhost:4000`에서 확인할 수 있게한다.

### 2. [Liquid](https://jekyllrb.com/docs/step-by-step/02-liquid/)

Liquid 는 jekyll 이 좀 더 흥미로워지는 지점이다. Liquid 는 세개의 파트(objects, tags, filters) 로 구성된 template 언어다.

#### Objects

output content 가 위치하는 곳을 말한다. 두개의 중괄호({% raw %}`{{`, `}}`{% endraw %})로 표현한다. 예를 들어 아래 코드는 페이지에 page.title 변수를 출력한다.

```text
{% raw %}
{{ page.title }}
{% endraw %}
```

#### Tags

Tag 는 템플릿을 위한 로직과 흐름제어를 생성한다. `tag`는 중괄호와 퍼센트 쌍({% raw %}`{%`, `%}`{% endraw %})으로 표현한다. 예를 들어 아래 코드는 `page.show_sidebar` 가 true 인 경우에 sidebar 를 출력한다. jekyll 에서 사용할 수 있는 tag 는 [여기](https://jekyllrb.com/docs/liquid/tags/) 에서 확인할 수 있다.

```html
{% raw %}
{% if page.show_sidebar %}
    <div class="sidebar"%>
        sidebar content
    </div>
{% endif %}
{% endraw %}
```

#### filters

filter 는 liquid object 출력을 변경한다. filter 는 출력구문 내부에서 사용되며 `|`로 구분되어진다. 예를 들어 아래 코드는 `Hi` 를 출력한다. jekyll 에서 사용가능한 filter 는 [여기](https://jekyllrb.com/docs/liquid/filters/) 에서 확인할 수 있다.

```text
{% raw %}
{{ "hi" | capitalize }}
{% endraw %}
```

#### Use Liquid
liquid 가 페이지에 적용되게 하려면 front matter 를 추가해야한다. (front matter 에서 변수 할당)

### 3. [Front Matter](https://jekyllrb.com/docs/step-by-step/03-front-matter/)
front matter 란 YAML 포멧의 코드 조각으로 파일 최상단에 두개의 triple-dash 로 감싼형태로 위치한다.

```

---
my_number: 5
---

```

Liquid 에서는 `page` 변수를 이용해서 front matter 변수를 사용할 수 있다.

```text
{% raw %}
{{ page.my_number }}
{% endraw %}
```

#### Use front matter
front matter 를 사용해서 사이트의 `<title>`을 바꿔보자.

```html
{% raw %}
---
title: Home
---
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>{{ page.title }}</title>
    </head>
    <body>
        <h1>{{ "Hello World" | downcase }}</h1>
    </body>
</html>
{% endraw %}
```

아마 당신은 기본 html 보다 더 많은 코드를 작성하는 이런 방식을 왜 사용하는지 궁금할 것이다. 다음 stop 에서 이런 방식을 사용하는 이유를 보게될 것이다.

### 4. [Layout](https://jekyllrb.com/docs/step-by-step/04-layouts/)
웹사이트는 보통 하나 이상의 페이지를 가지고 이 웹사이트도 마찬가지다.   
  
jekyll 은 html 뿐만 아니라 markdown 도 지원한다. markdown 은 간단한 컨텐츠 구조를 가진 페이지를 위한 최상의 선택이다. 왜냐하면 html 보다 덜 장황하기 때문이다. 다음 페이지에서 시도해보자.  
  
루트에 `about.md` 를 생성하라.  
  
구조적으로는 `index.html` 을 복사하고 수정해서 about 페이지를 만들 수 있다. 이 방식의 문제점으 중복코드다. 당신의 사이트에 stylesheet 를 추가한다고 가정해보자. 당신의 각각의 페이지에 `<head>` 태그에 스타일을 추가해야만 할 것이다. 이 방식은 두 페이지짜리 사이트 에서는 나쁘지 않아 보이지만, 100 페이지에 이 일을 한다고 상상해보라. 간단한 변경 조차 많은 시간이 걸릴 것이다.

#### Creating a layout
layout 을 사용하는 것이 더 나은 선택이다. layout 은 당신의 컨텐츠를 감싸는 템플릿이다. layout 은 `_layouts` 디렉토리에 위치한다.   
  
아래 컨텐츠를 이용해서 `_layouts/default.html` 에 당신의 첫 번째 레이아웃을 생성해라.

```html
{% raw %}
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>{{ page.title }}</title>
    </head>
    <body>
        {{ content }}
    </body>
</html>
{% endraw %}
```

front matter 가 없고 페이지의 컨텐츠가 `content` 변수로 변경된 것을 제외하면 `index.html`과 거의 같은 것을 알게 될 것이다. `content` 는 불려지는 페이지의 rendered content 를 값으로 갖는 특별한 변수다.  
  
`index.html` 이 이 레이아웃을 사용하게 하기 위해 front matter 에  `layout` 변수를 설정할 수 있다. layout 은 페이지의 컨텐츠를 감싸기 때문에 `index.html` 에 필요한 내용은 아래와 같다.

```html
{% raw %}
---
layout: defalut
title: Home
---
<h1>{{ "Hello World!" | downcase }}</h1>
{% endraw %}
```

이렇게 하고 나면 이전과 결과는 이전과 정확하게 같을 것이다. layout 에서 `page` front matter 에 접근할 수 있음을 기억해라. 위 경우는 index 페이지의 front matter 에 `title` 이 할당되어 있지만 layout 에서 출력되었다.  
  
#### About page 
about 페이지로 돌아와서, `index.html`을 카페하는 대신 layout 을 사용할 수 있다.  
  
`about.md` 에 아래 내용을 추가하라.

```markdown

---
layout: default
title: About
---
# About page

This page tells you a little bit about me.
```

### 5. [Includes](https://jekyllrb.com/docs/step-by-step/05-includes/)

사이트가 생성되었지만 페이지간 이동할 수 있는 방법이 없다. 수정해보자.  
  
navigation 은 모든 페이지에 있어야하기 때문에 layout 이 그 역할을 하기에 좋은 장소이다. layout 에 직접 추가하는 대신 이것을 include 에 관해 배우는 기회로 사용하자.  
  
#### Include tag

`include` 태그는 `_includes` 디렉토리에 있는 다른 파일의 컨텐츠를 포함할 수 있게 한다. include 는 사이트에서 반복적으로 사용되는 소스코드를 단일 파일로 관리하거나 리더빌리티를 높이는데 유용하다.  
  
navigation 소스 코드는 복잡해질 수 있게 때문에 때로는 그것을 include 로 이동하는 것이 좋다.  
  
#### Include usage

`_includes/navagation.html` 파일을 아래 내용으로 생성해라.

```html
<nav>
    <a href="/">Home</a>
    <a href="/about.html">About</a>
</nav>
```

include 태그를 이용해 `_layouts/default.html` 에 navigation 을 추가하자.

```html
{% raw %}
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>{{ page.title }}</title>
    </head>
    <body>
        {% include navigation.html %}
        {{ content }}
    </body>
</html>
{% endraw %}
```

#### Current page highlighting

한 단계 더 나가 navigation 에서 현재 페이지를 하이라이팅해보자.

`_includes/navigation.html` 은 자신이 포함되어있는 페이지의 주소를 알아야만 스타일을 추가할 수 있다. jekyll 은 `page.url` 이라는 유용한 변수를 가지고 있다.

`page.url` 을 사용해서 link 와 현재 페이지가 같은지 체크하고 같은 경우 붉은 색으로 표시할 수 있다.

```html
<nav>
    <a href="/" {% if page.url == "/" %}style="color: red;"{% endif %}>Home</a>
    <a href="/about.html" {% if page.url == "/about.html" %}style="color: red"{% endif %}>About</a>
</nav>
```

만약 당신이 navigation 에 새로운 아이템을 추가나 하이라이트 생상변경을 원한다면 여기에는 여전히 많은 반복이 있다.

### 6. [Data Files](https://jekyllrb.com/docs/step-by-step/06-data-files/)

jekyll 은 `_data` 디렉토리에 있는 YAML, JSON, CSV 파일에서 데이터를 불로울 수 있다. 데이터 파일은 사이트를 쉽게 관리할 수 있도록 컨텐츠와 소스코드를 분리할 수 있는 좋은 수단이다. 

이번 과정에서는 네비게이션의 컨텐츠를 데이터 파일에 저장한 뒤 네비게이션이 포함된 곳에서 조회할 것이다.

#### Data file usage

YAML 은 루비 환경에서 일반적인 포멧이다. 당신은 네비게이션 목록을 저장하는데 사용할 것이며 각각의 항목은 name 과 link 로 구성된다.

아래 내용으로 `_data/navigation.yml` 에 네비게이션에 사용될 데이터 파일을 생성하라.

```yaml
- name: Home
  link: /
- name: About
  link: /about.html
```

jekyll 은 이 데이터 파일을 `site.data.navigation` 로 사용할 수 있게 한다. `_includes/navigation.html` 에서 각각의 링크를 출력하는 대신 데이터 파일의 내용을 사용할 수 있다.

```html
{% raw %}
<nav>
    {% for item in site.data.navigation %}
    <a href="{{ item.link }}" {% if page.url == item.link %}style="color: red"{% endif %}>
        {{ item.name }}
    </a>
    {% endfor %}
</nav>
{% endraw %}
```

결과는 이전과 같다. 차이점이라면 네비게이션에 새로운 항목을 추가하는 일과 html 의 구조를 변경하는 일이 쉬워졌다는 점이다.

### 7. [Assets](https://jekyllrb.com/docs/step-by-step/07-assets/)

jekyll 에서 css, js, image 등 자원을 사용하는 것은 직관적이다. 파일들을 사이트 폴더에 두면 빌드 때 복사된다.

#### Sass

`_includes/navigation.html` 에서 사용한 inline style 은 좋은 에제가 아니다. 클래스를 이용해 사타일을 적용해보자.

```html
{% raw %}
<nav>
    <a href="{{ item.link }}" {% if page.url == item.link %}class="current"{% endif %}>
        {{ item.name }}
    </a>
</nav>
{% endraw %}
```

표준 css 를 사용할 수도 있지만 우리는 sass 를 사용할 것이다. sass 는 jekyll 에서 바로 구워지는 환상적은 css 확장이다. 

첫 번째 sass 파일을 `/assets/css/style.scss`에 아래 내용으로 만들자.

```sass

---
---
@import "main";
```

비어있는 front matter 는 jekyll 에게 처리가 필요한 파일임을 알려준다. `@import "main"` 은 sass 가 `main.scss` 파일을 sass 디렉토리에서 찾도록 한다. 기본 sass 디렉토리는 `_sass/` 다.

이번 과정에서는 당지 하나의 css 파일만 사용한다. 이 방식은 큰 프로젝트에서 css 를 잘 정리할 수 있는 좋은 방법이다.

아래 내용으로 `_sass/main.scss` 파일을 생성하라.

```css
.current {
    color: green;
}
```

이제 레이아웃에서 stylesheet 를 참조해야한다.

`_layouts/default.html` 파일을 열고 stylesheet 를 `<head>`에 추가하라.

```html
{% raw %}
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>{{ page.title }}</title>
        <link rel="stylesheet" href="/assets/css/style.css">
    </head>
    <body>
        {% include navigation.html %}
        {{ content  }}
    </body>
</html>
{% endraw %}
```

### 8. [Blogging](https://jekyllrb.com/docs/step-by-step/08-blogging/)

당신은 데이터베이스없이 어떻게 블로그를 가질 수 있는지 궁금할 것이다. jekyll 스타일을 이용해 텍스트 만으로 블로깅할 수 있다.

#### Posts

블로그 포스트는 `_posts` 디렉토리에 위치한다. 포스트에 사용할 파일이름은 특별한 형태를 갖는다:발행일, 제목, 확장자.

아래 내용으로 `_posts/2018-08-20-bananas.md` 파일에 첫 포스트를 생성하라.

```markdown

---
layout: post
author: jill
---
A banana is an ...
```

이것은 author 가 있는 것과 다른 레이아웃을 사용하는 것을 제외하면 이전에 생성한 `about.md`와 비슷하다. `author`는 custom 변수이다. 이것은 필수가 아니며 `creator` 같은 다른 이름이 사용될 수 있다.

#### Layout

`post` 레이아웃은 아직 만들지 않았기 때문에 아래 내용으로 `_layout/post.html`에 만들어야한다.

```html
{% raw %}
---
layout: default
---
<h1>{{ page.title }}</h1>
<p>{{ page.date | date_to_string }} - {{ page.author }}</p>

{{ content }}
{% endraw %}
```

이것은 레이아웃 상속의 예다. 포스트 레이아웃은 제목, 날짜, 저자 그리고 컨텐츠를 출력하고 이는 기본 레이아웃으로 감싸져있다.

`date_to_string` 필터도 기억하라. 이것은 날짜를 더 나은 형태로 변경한다.

#### List posts

현재는 블로그 포스트를 순회할 수 있는 방법이 없다. 보통 블로그는 포스트 목록을 보여주는 페이지를 가지고 있다. 다음으로 그걸 만들자.

jekyll 은 `site.posts` 를 통해 포스트를 사용할 수 있게 만든다.

사이트 루트에 아래 내용으로 `blog.html` 을 만들어라.

```html
{% raw %}
---
layout: default
title: Blog
---
<h1>Lastest Posts</h1>

<ul>
    {% for post in site.posts %}
    <li>
        <h2><a href="{{ post.url }}">{{ posts.title }}</a></h2>
        <p>{{ post.excerpt }}</p>
    </li>
    {% endfor %}
</ul>
{% endraw %}
```

이 코드에는 알아둬야할 몇 가지 것이 있다.
- `post.url` 은 jekyll에 의해 자동으로 포스트의 출력경로로 세팅된다.
- `post.title` 은 파일명에서 가져오며 `title` front matter 로 덮어 쓸 수 있다.
- `post.excerpt` 는 기본적으로 컨텐츠의 첫 문단이다.

주 네비게이션을 이용해 이 페이지를 접근할 수 있는 방법도 필요하다. 블로그 페이지를 추가하기 위해 `_data/navigation.yml` 파일을 열고 아래 내용을 추가하라.

```yml
- name: Home
  link: /
- name: About
  link: /about.html
- name: Blog
  link: /blog.html
```

#### More posts

포스트 파일 추가...

### 8. [Collections](https://jekyllrb.com/docs/step-by-step/09-collections/)

저자들이 그들이 생성한 포스트와 짧은 선전 문구를 보여줄 수 있는 페이지를 만들어보자. 

이 작업을 하기 위해 collection 을 사용할 것이다. collection 은 컨텐츠가 날짜로 그룹핑 되지 않아도 되는 점을 제외하고 포스트와 유사하다.

#### Configuration

collection 을 설정하려면 jekyll 에게 알려야한다. 기본적으로 jekyll 은`_config.yml` 파일을 이용해 설정한다. 

루트에 아래 내용으로 `_config.yml` 파일을 생성하라.

```yml
collections:
    authors:
```

#### Add authors

문서(Document : the items in collection) 는 `_*collection_name*` 형태의 폴더로 사이트 루트에 위치한다. 이번 경우는 `_authors` 다.

각 저자에 대한 문서를 생성하라.

```text
_authors/jill.md
```

```text

---
short_name: jill
name: Jill Smith
position: Cheif Editor
---
Jill is an avid fruit grower based in the south of France.
```


```text
_autors/ted.md
```


```text

---
short_name: ted
name: Ted Doe
position: Writer
---
Ted has been eating fruit since he was baby.
```

#### Staff

사이트의 모든 저자를 보여주는 페이지를 추가하자. jekyll 은 `site.authors` 를 이용해 collection 에 접근할 수 있게 한다.

`staff.html` 파일을 만들고 모든 스텝을 출력하기 위해 `site.authors` 를 순회하라.

```html
{% raw %}
---
layout: default
title: Staff
---
<h1>Staff</h1>

<ul>
    {% for author in site.authors %}
    <li>
        <h2>{{ author.name }}</h2>
        <h3>{{ author.position }}</h3>
        <p>{{ author.content | markdownify }}</p>
    </li>
    {% endfor %}
</ul>
{% endraw %}
```

컨텐츠가 마크다운이기 때문에 `markdownify` 필터를 사용해야한다. `{% raw %}{{ content }}{% endraw %} 를 사용할 때는 자동으로 적용된다.

네비게이션을 통해 이 페이지에 접근하기 위한 방법도 필요하다. `_data/navigation.yml` 파일을 열고 staff 페이지를 추가하라.

```yml
- name: Home
  link: /
- name: About
  link: /about.html
- name: Blog
  link: /blog.html
- name: Staff
  link: /staff.html
```

#### Output a page

기본적으로 collection 은 문서에 대한 페이지를 출력하지 않는다. 이번 경우는 각 저자에 대한 페이지를 원하기 때문에 collection 의 설정을 수정하자.

`_config.yml` 파일을 열고 저자 collection 설정에 `output: true` 를 추가하라.

```yml
collections:
    authors:
        output: ture
```

`author.url` 을 이용하면 결과 페이지에 연결할 수 있다.

`staff.html` 페이지에 링크를 추가하라.

```html
{% raw %}
---
layout: default
---
<h1>Staff</h1>

<ul>
  {% for author in site.authors %}
    <li>
      <h2><a href="{{ author.url }}">{{ author.name }}</a></h2>
      <h3>{{ author.position }}</h3>
      <p>{{ author.content | markdownify }}</p>
    </li>
  {% endfor %}
</ul>{% endraw %}
```

post 에서 했던 것과 같이 autor 를 위한 레이아웃을 만들어야한다.
  
아래 내용으로 `_layouts/author.html` 을 생성하라.

```html
{% raw %}
---
layout: default
---
<h1>{{ page.name }}</h1>
<h2>{{ page.position }}</h2>

{{ content }}
{% endraw %}
```

#### Front matter defaults

이제 우리는 author 문서가 `author` 레이아웃을 사용하도록 설정해야한다. 이전에 했던 것 처럼 front matter 를 변경하면 되지만 반복적인 작업이다.

당신이 진정으로 원하는 것은 모든 포스트는 post 레이아웃이, 저자는 author 레이아웃이 그리고 이외 페이지는 default 레이아웃이 자동으로 사용되는 것이다.

`_config.yml` 에서 front matter defaults 를 사용해서 이 문제를 해결할 수 있다. 기본값을 적용할 범위를 설정한 후 원하는 기본 front matter 를 설정한다.

`_config.yml` 에 레이아웃에 대한 기본값을 추가하라.

```yaml
collections:
  authors:
    output: true

defaults:
  - scope:
      path: ""
      type: "authors"
    values:
      layout: "author"
  - scope:
      path: ""
      type: "posts"
    values:
      layout: "post"
  - scope:
      path: ""
    values:
      layout: "default"
```

이제 모든 페이지와 포스트의 front matter 에서 layout 을 제거할 수 있다. `_config.yml` 의 변경을 적용하려면 jekyll 을 재시작해야한다.

#### List author's posts

저자 페이지에 그들이 작성한 포스트 목록을 출력해보자. 그렇게 하려면 저자의 `short_name` 과 포스트의 `author` 를 맞춰야한다. 이 값을 이용해 저자별 포스트를 찾는다.

찾은 저자별 목록을 이용해 `_layouts/author.html` 에 저자의 포스트를 출력하라.

```html
{% raw %}
---
layout: default
---
<h1>{{ page.name }}</h1>
<h2>{{ page.position }}</h2>

{{ content }}

<h2>Posts</h2>
<ul>
  {% assign filtered_posts = site.posts | where: 'author', page.short_name %}
  {% for post in filtered_posts %}
    <li><a href="{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
{% endraw %}
```

#### Link to authors page

포스트에는 저자에 대한 참조가 있으니 저자의 페이지로 연결해보자. 이것은 `_layouts/post.html`에서 비슷한 필터링 기술을 사용해 작업할 수 있다.

```html
{% raw %}
---
layout: default
---
<h1>{{ page.title }}</h1>

<p>
    {{ page.date || date_to_string }}
    {% assign author = site.authors | where: 'short_name', page.author | first %}
    {% if author %}
        - <a href="{{ author.url }}">{{ author.name }}</a>
    {% endif %}
</p>

{{ content }}
{% endraw %}
```

### 10. [Deplyment](https://jekyllrb.com/docs/step-by-step/10-deployment/)

이 마지막 단계에서 우리는 출시가 준비된 사이트를 가질 것이다.

#### Gemfile

당신의 사이트를 위해 Gemfile 을 사용하는 것이 좋다. 이것은 jekyll 과 다른 gem 들의 버전이 다른 환경에서도 일관되도록 보장한다.

아래 내용으로 루트에 `Gemfile` 을 만들어라.

```gem
source 'https://rubygems.org'

gem 'jekyll'
```

그리고 `bundle install` 을 터미널에서 실행하라. 그러면 gem 들을 설치하고 이후 `bundle install`을 실행할 때 현재 gem 버전을 고정하기 위한 `Gemfile.lock` 파일을 생성한다. 만약 gem 의 버전을 업데이트 하고 싶으면 `bundle update`를 실행하면 된다.

`Gemfile` 을 사용할 때는 아래와 같이 `jekyll serve` 같은 명령은 앞에 `bundle exec` 를 붙여 실행한다.

```bash
bundle exec jekyll serve
```

이것은 당신의 ruby 환경이 `Gemfile` 에 설정된 gem 만 사용하도록 제한한다.

#### Plugins

jekyll 플러그인을 사용하면 당신의 사이트에 고유한 사용자 정의 생성 컨텐츠를 생성할 수 있다. 많은 플러그인이 사용 가능하며 직접 작성할 수도 있다.

거의 모든 jekyll 사이트에서 유용한 공식 플러그인이 세 개 있다. 

- jekyll-sitemap - 검색 엔진이 컨텐츠 색인을 만드는데 도움을 주는 sitemap 파일을 만든다.
- jekyll-feed - 당신의 포스트에 대한 RSS 를 만든다.
- jekyll-seo-tag - SEO 에 도움이 되는 메타 태그를 추가한다.

처음으로 플러그인을 사용하기 위해서는 `Gemfile`에 추가해야한다. `jekyll_plugins` 그룹에 플러그인을 두면 jekyll 에 자동으로 요청된다.

```gem
source 'https://rubygems.org'

gem 'jekyll'

group :jekyll_plugins do
  gem 'jekyll-sitemap'
  gem 'jekyll-feed'
  gem 'jekyll-seo-tag'
end
```

이제 `bundle update` 를 실행해서 플러그인을 설치하라.

`jekyll-sitemap` 은 설정이 필요없다. sitemap 은 빌드시 생성된다.

`jekyll-feed` 와 `jekyll-seo-tag` 를 사용하려면 `_layouts/default.html` 에 태그를 추가해야한다.

```html
{% raw %}
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>{{ page.title }}</title>
    <link rel="stylesheet" href="/assets/css/styles.css">
    {% feed_meta %}
    {% seo %}
  </head>
  <body>
    {% include navigation.html %}
    {{ content }}
  </body>
</html>
{% endraw %}
```

jekyll 서버를 재시작하고 `<head>` 에 관련 태그들이 추가된 것을 확인하라.

#### Enviroments

가끔 프로덕션 환경에서는 어떤 것을 출력하지만 개발환경에서는 그러지 않기를 원하는 경우가 있을 것이다. analytics 스크립트가 대표적이다.

이를 위해 enviroment 를 사용할 수 있다. 명령을 실행할 때 `JEKYLL_ENV` 환경 변수를 사용하면 enviroment 를 설정할 수 있다. 예를 들면 :

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

`JEKYLL_ENV` 의 기본값은 development 이다. `JEKYLL_ENV` 값은 `jekyll.enviroment` 를 통해 liquid 에서 사용할 수 있다. 그렇기 때문에 analytics 스크립트를 프로덕션에서만 사용하려면 다음과 같이 하면 된다.

```html
{% if jekyll.enviroment == "production" %}
    <script src="my-analytics-script.js"></script>
{% endif %}
```

#### Deployment

마지막 과정은 프로덕션 서버로 사이트를 가져가는 것이다. 가장 기본적인 방법은 프로덕션 빌드를 실행하는 것이다.

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

그리고 `_site` 의 내용을 서버에 카피하라.