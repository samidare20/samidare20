---
title: "stash"
date: 2026-02-12T10:41:00+09:00
categories: ["utils", "Github"]
---

현재 작업 현황을 임시적으로 저장

commit 되지 않은 모든 파일들이 저장됨

## git stash 

### stash 저장하기

```bash
$ git stash
Saved working directory and index state WIP on main: abc1234 Latest commit message
```


```bash title="stash 이름 지정해 저장하기"
$ git stash save "123"
Saved working directory and index state On main: 123
```
### stash 목록 확인

```bash
$ git stash list
stash@{0}: WIP on main: abc1234 Latest commit message
stash@{1}: WIP on main: def5678 Previous commit message
```

### stash 적용하기

```bash title="stack 의 pop처럼 가장 최근의 stash 적용 및 삭제"
$ git stash pop
```

```bash title="특정 stash 적용"
$ git stash apply stash@{1}
```

### stash 적용 없이 삭제하기

```bash title="가장 최근의 stash 삭제"
$ git stash drop
```

```bash title="특정 stash 제거"
$ git stash drop stash@{1}
```

```bash title="모든 stash 버리기"
$ git stash clear
```