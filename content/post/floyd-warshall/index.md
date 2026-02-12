---
title: "플로이드-워셜 (Floyd-Warshall)"
date: 2026-02-12T10:41:00+09:00
categories: ["DataStructure", "Graph"]
---

모든 점에서 다른 모든 점까지의 비용을 모두 구함


## 특징

모든 노드를 기준으로 다른 모든 노드들까지의 비용을 구함.

모든 경우의 수를 다 구하므로 시간복잡도가 높음.

음수의 간선도 처리 가능. 

## 시간 복잡도

O(V<sup>3</sup>)

## 구현

1. 거리 배열 초기화

```cpp
for(int i = 1; i<=n; i++){
    for(int j =1; j<=n; j++){
        if (i == j) dist[i][j] = 0;
        else if (board[i][j]) dist[i][j] = board[i][j];
        else dist[i][j] = INF;
    }
}
```
직접 이어져 있는 노드는 해당 비용으로, 자기 자신 노드는 0으로, 이외는 최대값으로 채운다.

연산이 끝났을 때에도 최대값이라면 이어지는 경로가 없는 것.


2. 연산
```cpp
for(int k = 1; k<= n; k++){
    for(int i = 1; i <= n; i++){
        for(int j = 1; j<=n; j++){
            dist[i][j] = min(dist[i][j], dist[i][k]+dist[k][j]);
        }
    }
}
```