# Git知识总结

### Git的三种工作区域
* Git的本地仓库：在.git目录中
* 暂存区：在.git目录中
* 工作区：用户操作目录

### Git的三种状态
* 已提交(commited)：该文件已经被安全地保存在本地仓库中
* 已暂存(staged)：把已修改的文件放在下次提交时要保存的清单中
* 已修改(modified)：修改了某个文件，但还没有提交保存

### Git的基本操作

```bash
# 将工作区中所有修改提交到暂存区，“.”的含义就是所有修改
git add .  
# 将暂存区的所有修改提交到当前分支，-m参数是命名当前的提交
git commit -m 'first commit'
```

```
// 查看有哪些文件修改
git status
// 查看某个文件修改的具体内容
git diff <filename>
// 查看以往的提交记录，可添加—pretty=oneline参数
git log
```

### 远程仓库

1、 使用克隆命令从远程服务器克隆版本库到本地
```
// url是远程版本库的地址
git clone <url>
```

当使用git clone <url>命令克隆远程仓库时，已经自动添加了远程仓库，别名为origin。

2、 本地手动创建版本库
```
// 手动创建版本库
git init
// 和远程仓库关联，需先添加一个远程仓库
git remote add <remote-name> <url>

```

#### 远程仓库常用命令

```
// 查看远程版本库的信息
git remote -v
// 删除一个远程仓库
git remote remove <别名>

// 若想把本地仓库中的修改提交到远程仓库，使用如下命令
git push <remote-name> <branch>
// 从远程仓库中获取代码并进行快速合并
git pull <remote-name> <branch>

// 从远程仓库获取数据：

// 只是获取远程仓库的数据至.git目录，并未merge本地
git fetch origin dev
// 把获取的远程仓库的数据手工merge至当前分支
git merge origin/dev
// 获取远程仓库的数据，并自动merge至当前的分支，相当于以上两步
git pull origin dev

// 删除远程版本库的分支
git push origin :dev

// 提交本地test分支作为远程的dev分支
git push origin dev:test


// 在本地创建和远程分支对应的分支
git checkout -b branch-name origin/branch-name
// 建立本地分支和远程分支的关联
git branch —set-upstream branch-name origin/branch-name
```

### 分支
#### 分支常用命令
```
// 查看所有分支
git branch
// 创建一个新分支
git branch <new-branch>
// 切换到指定分支 
git checkout <branch>
// 创建一个新分支并切换到此新分支
git checkout -b <branch>
// 删除一个分支
git branch -d <branch>
// 将指定分支合并到当前分支
git merge <branch>
```

### 版本回退

每次提交，git都把它们串成一条时间线，这个时间线就是一个分支。
在git里，这个分支叫主分支，即master分支。

HEAD严格意义上来说不是指向提交，而是指向master指针。master指针才是指向提交的。

一开始，master分支是一条线，git用master指针指向最新的提交，再用HEAD指针指向master指针，就能确定当前分支，以及当前分支的提交点。


当创建新分支时，例如dev，git新建了一个指针叫dev，指向master相同的提交，再把HEAD指向dev，就表示当前分支在dev上。
此时，对工作区修改和提交就是在dev分支了，比如新提交一次，dev指针往前移动一步，而master指针不变。
若在dev上的工作完成了，就可以把dev合并到master上了，最简单的方法是把master指向dev的当前提交，就完成了合并。

在Git中，用HEAD表示当前版本，也就是最新的提交commit id，上一个版本就是HEAD^，上上一个版本就是HEAD^^，也可以使用HEAD～2。

```
// 丢弃工作区的修改  (还未添加到暂存区，即还没有add)
git checkout -- <file>
// 将暂存区的修改撤销掉，重新放回工作区 (已经add，还没有commit)
git reset HEAD <file>

// reset仅仅影响已追踪的文件，git clean用来清理未追踪的文件
// 还未添加到暂存区，删除工作区新增的文件
rm <file>   or   git clean -f
// 已添加到暂存区，参数—cached保留文件并从暂存区中移除，参数-f删除文件
git rm <file>
```

#### reset和revert

##### `revert`

假设有如下提交记录：(tips：箭头方向为parent节点，即先提交A，再提交B)
A <- B <- C <- D

情况1：现在不想要D了
```
git revert hash(D)
```
执行后会让填写message，相当于一次commit，生成E
A <- B <- C <- D <- E(revert)

A <- B <- C <- D

情况2：想回滚到C，C和D都不要了
```
git revert hash(B)..HEAD
```
执行后会让填写两次message，生成两个commit，E和F
A <- B <- C <- D <- E(revert) <- F(revert)

A <- B <- C <- D

情况3：想回滚C，C不要了，D还要
```
git revert hash(C)
```
执行后填写一次message
A <- B <- C <- D <- E(revert)

revert hash	---- 这个hash是对应想删除的commit  
revert hash..HEAD --- 这个hash对应的commit不会被删除，会删除它后面的commit  
revert --- 会产生新的提交，并不会真正删除history

##### `reset`

假设有如下提交记录：(tips：箭头方向为parent节点，即先提交A，再提交B)
A <- B <- C <- D

若想删除到C，即C和D都不要了
```
git reset hash(B) —hard
```
执行命令后本地的commit history就被干掉了
A <- B

当执行git push时，会提示不能提交。但凡修改历史跟origin冲突时，必须强制覆盖提交，使用git push -f同步到origin。

其中，reset —hard表示暂存区和工作区都不保留回滚回来的代码，若不加—hard，删除掉的C和D的文件会进入工作区。

注意：reset很危险。

总结

1、revert的工作方式是：

将一个老的commit的改动完全找出来，在新的tip处运行反操作，最终清除老的commit的改动。revert的应用场景多在对public repo的历史信息反悔。

2、reset的工作方式是：

重写历史，将commit之后的所有commits丢弃。因此，reset往往只存在于本地的commit历史整理反悔。一旦push分享到public repo中，不应再reset。

#### merge和rebase

git rebase和git merge的最大区别，两种合并产生的log不一样。

使用merge时，合并会产生一个多余节点代表了合并。最后产生的log随着特性分支的增多，log tree显得非常凌乱。

使用rebase时，最后产生的log tree会成一条线，但依然能清晰看出特性分支。在合并冲突时，没有merge好用。

### 特殊场景

场景：当接到一个新的bug，急需解决，但是目前工作想保留。

方法：Git提供了一个stash功能，可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作。

dev分支
```
// 将修改保存到暂存区
git add .
// 将工作现场储藏起来
git stash
```

master分支

```
git checkout master		# 切换到master分支
……
```
dev分支
```
// 切换回dev分支
git checkout dev
// 查看状态
git status
```

工作区是干净的，这是需要查看之前保存的工作现场。
```
// 查看存储的stash
git stash list
```
工作现场还在，git把stash内容存在某个地方了，有两个方法恢复：
```
// 恢复但stash内容不删除
git stash apply
// 删除stash内容
git stash drop

// 恢复并删除stash内容
git stash pop
```

可以多次stash，通过git stash list查看，然后恢复指定stash
```
git stash apply stash@{0}
```

