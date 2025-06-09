const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const products = require('./products.json');

// Carrega o proto com as opções corretas
const packageDefinition = protoLoader.loadSync('proto/inventory.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

// ⚠️ Usa o nome do package declarado no .proto: "inventory"
const inventoryProto = grpc.loadPackageDefinition(packageDefinition);

// Instancia o servidor gRPC
const server = new grpc.Server();

// Registra o serviço
server.addService(inventoryProto.inventory.InventoryService.service, {
    SearchAllProducts: (_, callback) => {
        callback(null, {
            products: products,
        });
    },

    SearchProductByID: (payload, callback) => {
        const product = products.find((p) => p.id === payload.request.id);
        if (!product) {
            return callback({
                code: grpc.status.NOT_FOUND,
                message: 'Produto não encontrado',
            });
        }
        callback(null, product);
    },
});

// Inicia o servidor gRPC
server.bindAsync('127.0.0.1:3002', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Inventory Service running at http://127.0.0.1:3002');
    server.start();
});
