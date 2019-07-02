# node process & child_process & cluster

## process

Process api can be used in context of every process, without import it. There are some useful apis and events to remember:

API:

1. agrv. arguments while start the process
2. execPath. absolute path of node
3. cwd(). current working dir
4. env. process.env.NODE_ENV
5. execArgv. arguments when exec a cmd
6. pid. process id
7. exit(code?). exit process by itselft
8. kill(pid[, singal]). kill a process by sending singal to os

EVENT:

1. exit. when process exit
2. message. communication with child/paretn
3. uncaughtException. trigger when exception not catched. it's a global handler for exception
4. unhandledRejection. trigger when unhandled rejection occured in promise
6. disconnect. trigger when ipc channel is close, may child unref() or disconnect()

## child_process

there are four apis, but it's actually only one: `spawn`, the other three are just alias to spawn with different options.

1. exec(command[, options][, callback(err, stdout, stderr)]). exec a cmd, args are in cmd str
2. execFile(file[, args][, options][callback]), exec a script file
3. spawn(command str[, args][, options]). it has no callback, need listen(aka on) to get err, stdin/out, and exit

    **options.detached** is related to create guard process. spawn a child process with `detached: true`, then exit parent process, child process will attach to init process, which become a guard process
4. fork(modulePath[, args][, options]) create a child process with ipc channel, which means parent and child can communicate with each other.

    **options.stdio** specify which kind of way to build communication channel, "pipe", "ipc" or "ignore"

## cluster

cluster is a master-worker model, master is manager to workers, it fork them and transfer works to them.there are several questions:

1. How can all the workers listen on the same port?
2. How does the master distribute the works to workers evenly?
3. What do the workers do when master is killed or exit?

For answering 1, node uses api hijack the `listen` method of http module. When workers listen to one port, it's actually the master listen on it, then master transfer every work(request) to workers through ipc. 

For answering 2, cluster use `Round-Robin` algorithm to balance the requests. `Round-Robin` is a kind of polling stragedy, it decides to transfer the current request to which worker.

> Round-robin algorithm is a pre-emptive algorithm as the scheduler forces the process out of the CPU once the time quota expires.

> For example, if the time slot is 100 milliseconds, and job1 takes a total time of 250 ms to complete, the round-robin scheduler will suspend the job after 100 ms and give other jobs their time on the CPU. Once the other jobs have had their equal share (100 ms each), job1 will get another allocation of CPU time and the cycle will repeat. This process continues until the job finishes and needs no more time on the CPU.

For answering 3, all the workers will be dead when master exit, but `exit` event of workers will not be triggered.

> During graceful shutdown of an application that has spawned workers, the master process ends gracefully while the workers end abruptly in spite of setting the event handler. This is because the termination signals are not propagated to the child process and the child process terminates **because of the broken pipe**.