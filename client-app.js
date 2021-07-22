const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const tasksDefs = protoLoader.loadSync('./tasks.proto');
const tasksProto = grpc.loadPackageDefinition(tasksDefs);

const clientGRPC = new tasksProto.TaskService('0.0.0.0:5050', grpc.credentials.createInsecure());

clientGRPC.findAll({}, (err, tasks) => {
    if (err) {
        console.error(err);
        return;
    }

    console.table(tasks);
});

clientGRPC.findOne({ id: 2 } , (err, task) => {
    if (err) {
        console.error(err);
        return;
    }

    console.table(task);
});

clientGRPC.findOne({ id: -1 } , (err, task) => {
    if (err) {
        console.error(err.message);
        return;
    }

    console.table(task);
});
