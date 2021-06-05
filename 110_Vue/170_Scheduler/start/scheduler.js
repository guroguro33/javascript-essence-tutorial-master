

let isFlushing = false;
let isFlushPending = false;
const queue = [];
const p = Promise.resolve();

function nextTick(fn) {
    return p.then(fn);
}

// queueにjobを追加するメソッド
function queueJob(job) {
    if (!queue.includes(job)) {
        // queueにjobが含まれていない場合、jobを追加
        queue.push(job);
        queueFlush();
    }
}

function queueFlush() {
    if (!isFlushPending && !isFlushing) {
        // flushPendingもflushingも空の場合、非同期でflushJobsを実行
        isFlushPending = true;
        // queueJobにflushJobsを追加
        nextTick(flushJobs);
    }
}

// flushJobsを実行するメソッド
function flushJobs() {
    let job;
    let isFlushing = true;
    let isFlushPending = false;
    while ((job = queue.shift()) !== undefined) {
        // queueを前方から１つづつ取り出して、未定義じゃなければ実行
        job();
    }
    // 空になったらflushingを修了
    isFlushing = false;
}

export { queueJob, nextTick };