const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader'); 


const packageDefinition = protoLoader.loadSync('proto/inventory.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const proto = grpc.loadPackageDefinition(packageDefinition);

// AQUI é onde estava o erro — precisamos acessar via pacote:
const client = new proto.inventory.InventoryService(
    '127.0.0.1:3002',
    grpc.credentials.createInsecure()
);

module.exports = client;
