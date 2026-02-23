---
title: "C# 큰 소수 처리"
date: 2026-02-23T10:46:00+09:00
categories: ["C#","Trouble"]
---

## C#은 소수점이 길어지면 이를 모두 보여주지 않음

계산기처럼 E를 사용하거나, 소수점 뒤쪽이 모두 표기되지 않는 식.
이때 포맷팅을 사용해 강제로 모두 보이도록 할 수 있음.

```csharp
    double ans=Math.Pow(2,-100);
    Console.Write(ans.ToString("F400").TrimEnd('0'));
```

F 뒤의 숫자만큼 0을 채워서라도 강제로 보여주는 형식이므로 TrimEnd를 통해 뒤의 0을 지워줌.