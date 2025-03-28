## Button 组件的 Menu 不能调整大小

Button 里面添加 asChild

## 添加 asChild 后，button 按钮变小

## prismaClient 新的用法

PrismaClient 是 Prisma 的核心类，用于与数据库进行交互。以下是 PrismaClient 的用法：
prisma 从 6 开始后，需要使用新的方法来创建 prismaclient 实例：

```js
import { PrismaClient } from "@prisma/client";
```

schema.prisma

```bash
generator client {
  provider = "prisma-client-js"
  output = "../lib/generated/prisma-client"
}
```

/lib/db.ts

```js
import { PrismaClient } from "@/lib/generated/prisma-client";
```
