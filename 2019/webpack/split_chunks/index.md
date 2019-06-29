# webpack split chunks

webpack splitChunks plugin and runtimeChunks are utilized to split source code of yours into parts.

there are several important options:

1. name. the name of chunks you split
2. chunks. which type of chunks will be split, there are 3 types:
    - "initial" means sync chunks
    - "async" means async chunks
    - "all" means both sync and async chunks
3. minChunks. the min number which a chunk is imported(used), this chunk will be splited when its imported number equals or larger than minChunks
4. cacheGroups. It's a place you can define many split chunks, and its options are most of the upper options, which means you can use `name`, `chunks`, `minChunks` in it.
5. test. match the path of modules