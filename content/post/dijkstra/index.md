---
title: "다익스트라 (dijkstra)"
date: 2026-02-12T10:41:00+09:00
categories: ["DataStructure", "Graph"]
---

시작점에서 다른 지점까지들의 비용을 구함


## 특징

시작지점에서부터 다른 모든 노드로의 비용을 구함. 단, 음수값을 가진 간선이 있으면 사용할 수 없음.

속도가 상당히 빠른 편.
## 시간 복잡도

O(VLogE)

## 구현

```cpp
void solv(int index) //index는 시작점
{
    vector<int> visit(1010,987654321);
    visit[index]=0; //다른 노드들까지의 비용이 저장됨
    
    priority_queue<pair<int,int>,vector<pair<int,int>>,greater<pair<int,int>>> q;
    q.push(make_pair(0,index));
    
    while(!q.empty())
    {
        auto a=q.top();
        q.pop();
            if(a.first>visit[a.second])
                continue;
        for(auto i:v[a.second])
        {
            if(visit[i.second]>visit[a.second]+i.first)
            {
                visit[i.second]=visit[a.second]+i.first;
                q.push(make_pair(visit[i.second],i.second));
            }
        }
    }
}
```