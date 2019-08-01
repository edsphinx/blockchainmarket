const BlockchainMarket = artifacts.require("./BlockchainMarket.sol");


contract("BlockchainMarket", async accounts => {
    const testowner = accounts[0];
    const testUser1 = accounts[1];
    const testUser2 = accounts[2];
    const testUser3 = accounts[3];
    const testUser4 = accounts[4];
    const testUser5 = accounts[5];
    const testUser6 = accounts[6];
    const testUser7 = accounts[7];
    const testUser8 = accounts[8];
    const testUser9 = accounts[9];

    let totalSellByStore7 = 0;

    //The first section is about testing the Main Store Methods creating a single and multiples stores
    describe("Store Methods", () => {
        // 1. New Single Store 
        it("1. Store is created correctly?", async () => {

            const blockchainMarket = await BlockchainMarket.deployed();
            
            await blockchainMarket.newStore("Store 1", testUser1, 0, { from: testUser1 });

            const newStore = await blockchainMarket.stores.call(0);

            const { owner, name, skuTotal, balance } = newStore;

            assert.equal("Store 1", name, "The name of the new store is not correct");
            assert.equal(testUser1, owner, "The Address of Store owner is not correct");
            assert.equal(0, skuTotal, "The total count of Items in the store are not correct");
            assert.equal(0, balance, "The Balance of the Store is not correct");

        });

        // 2. Multiple New Stores
        it("2. Multiple Store are created correctly?", async () => {

            let owner, name, skuTotal, balance;
        
            const blockchainMarket = await BlockchainMarket.deployed();

            await blockchainMarket.newStore("Store 1", testUser1, 0, { from: testUser1 });
            await blockchainMarket.newStore("Store 2", testUser2, 0, { from: testUser2 });

            const newStore1 = await blockchainMarket.stores.call(1);
            const newStore2 = await blockchainMarket.stores.call(2);

            ({ owner, name, skuTotal, balance } = newStore1);

            assert.equal("Store 1", name, "The name of the new store is not correct");
            assert.equal(testUser1, owner, "The Address of Store owner is not correct");
            assert.equal(0, skuTotal, "The total count of Items in the store are not correct");
            assert.equal(0, balance, "The Balance of the Store is not correct");

            ({ owner, name, skuTotal, balance } = newStore2);

            assert.equal("Store 2", name, "The name of the new store is not correct");
            assert.equal(testUser2, owner, "The Address of Store owner is not correct");
            assert.equal(0, skuTotal, "The total count of Items in the store are not correct");
            assert.equal(0, balance, "The Balance of the Store is not correct");
        });
    });

    //Second section is about testing the item methods creating new item in a Store and adding many new items to a store also create multiple items in multiple stores
    describe("Item Methods", () => {
        // New item
        it("3. Add new item in the Store", async () => {
            
            const blockchainMarket = await BlockchainMarket.deployed();

            await blockchainMarket.newItem("Item 1", 10, 1, 1, "imagetest1", { from: testUser1 });

            const newItem = await blockchainMarket.getItem(0, 1);

            const { name, sku, price, image } = newItem;

            assert.equal("Item 1", name, "The Item name is not correct");
            assert.equal(1, sku, "Item stock count is not correct");
            assert.equal(10, price, "💱 Item price is not correct");
            assert.equal("imagetest1", image, "Item image is not correct");
        });

        // Multiple New Items
        it("4. Add many new items in the Store of testUser2", async () => {
            let name, sku, price;

            const blockchainMarket = await BlockchainMarket.deployed();

            await blockchainMarket.newItem("Item 1", 10, 1, 2, "imagetest1", { from: testUser2 });
            await blockchainMarket.newItem("Item 2", 15, 2, 2, "imagetest1", { from: testUser2 });
            await blockchainMarket.newItem("Item 3", 20, 3, 2, "imagetest1", { from: testUser2 });
            await blockchainMarket.newItem("Item 4", 25, 4, 2, "imagetest1", { from: testUser2 });

            const newItem1 = await blockchainMarket.getItem(0, 2);
            const newItem2 = await blockchainMarket.getItem(1, 2);
            const newItem3 = await blockchainMarket.getItem(2, 2);
            const newItem4 = await blockchainMarket.getItem(3, 2);

            ({ name, sku, price, image } = newItem1);

            assert.equal("Item 1", name, "The Item name is not correct");
            assert.equal(1, sku, "Item stock count is not correct");
            assert.equal(10, price, "Item price is not correct");
            assert.equal("imagetest1", image, "Item image is not correct");

            ({ name, sku, price, image } = newItem2);

            assert.equal("Item 2", name, "The Item name is not correct");
            assert.equal(2, sku, "Item stock count is not correct");
            assert.equal(15, price, "Item price is not correct");
            assert.equal("imagetest1", image, "Item image is not correct");

            ({ name, sku, price, image } = newItem3);

            assert.equal("Item 3", name, "The Item name is not correct");
            assert.equal(3, sku, "Item stock count is not correct");
            assert.equal(20, price, "Item price is not correct");
            assert.equal("imagetest1", image, "Item image is not correct");

            ({ name, sku, price, image } = newItem4);

            assert.equal("Item 4", name, "The Item name is not correct");
            assert.equal(4, sku, "Item stock count is not correct");
            assert.equal(25, price, "Item price is not correct");
            assert.equal("imagetest1", image, "Item image is not correct");
        });

        // Multiple New Items
        it("5. Add many new items in the Multiple New Stores of testUser3 and testUser4", async () => {
            let name, sku, price;

            const blockchainMarket = await BlockchainMarket.deployed();

            await blockchainMarket.newStore("Store 3", testUser3, 0, { from: testUser3 });
            await blockchainMarket.newStore("Store 4", testUser4, 0, { from: testUser4 });

            await blockchainMarket.newItem("Item 1 User 3", 10, 1, 3, "imagetest1", { from: testUser3 });
            await blockchainMarket.newItem("Item 2 User 3", 15, 2, 3, "imagetest1", { from: testUser3 });
            await blockchainMarket.newItem("Item 3 User 3", 20, 3, 3, "imagetest1", { from: testUser3 });
            await blockchainMarket.newItem("Item 4 User 3", 25, 4, 3, "imagetest1", { from: testUser3 });

            const newItem1User3 = await blockchainMarket.getItem(0, 3);
            const newItem2User3 = await blockchainMarket.getItem(1, 3);
            const newItem3User3 = await blockchainMarket.getItem(2, 3);
            const newItem4User3 = await blockchainMarket.getItem(3, 3);

            ({ name, sku, price, image } = newItem1User3);

            assert.equal("Item 1 User 3", name, "The Item name is not correct");
            assert.equal(1, sku, "Item stock count is not correct");
            assert.equal(10, price, "Item price is not correct");
            assert.equal("imagetest1", image, "Item image is not correct");

            ({ name, sku, price, image } = newItem2User3);

            assert.equal("Item 2 User 3", name, "The Item name is not correct");
            assert.equal(2, sku, "Item stock count is not correct");
            assert.equal(15, price, "Item price is not correct");
            assert.equal("imagetest1", image, "Item image is not correct");

            ({ name, sku, price, image } = newItem3User3);

            assert.equal("Item 3 User 3", name, "The Item name is not correct");
            assert.equal(3, sku, "Item stock count is not correct");
            assert.equal(20, price, "Item price is not correct");
            assert.equal("imagetest1", image, "Item image is not correct");

            ({ name, sku, price, image } = newItem4User3);

            assert.equal("Item 4 User 3", name, "The Item name is not correct");
            assert.equal(4, sku, "Item stock count is not correct");
            assert.equal(25, price, "Item price is not correct");
            assert.equal("imagetest1", image, "Item image is not correct");

            await blockchainMarket.newItem("Item 1 User 4", 10, 1, 4, "imagetest1", { from: testUser4 });
            await blockchainMarket.newItem("Item 2 User 4", 15, 2, 4, "imagetest1", { from: testUser4 });
            await blockchainMarket.newItem("Item 3 User 4", 20, 3, 4, "imagetest1", { from: testUser4 });
            await blockchainMarket.newItem("Item 4 User 4", 25, 4, 4, "imagetest1", { from: testUser4 });

            const newItem1User4 = await blockchainMarket.getItem(0, 4);
            const newItem2User4 = await blockchainMarket.getItem(1, 4);
            const newItem3User4 = await blockchainMarket.getItem(2, 4);
            const newItem4User4 = await blockchainMarket.getItem(3, 4);

            ({ name, sku, price, image } = newItem1User4);

            assert.equal("Item 1 User 4", name, "The Item name is not correct");
            assert.equal(1, sku, "Item stock count is not correct");
            assert.equal(10, price, "Item price is not correct");
            assert.equal("imagetest1", image, "Item image is not correct");

            ({ name, sku, price, image } = newItem2User4);

            assert.equal("Item 2 User 4", name, "The Item name is not correct");
            assert.equal(2, sku, "Item stock count is not correct");
            assert.equal(15, price, "Item price is not correct");
            assert.equal("imagetest1", image, "Item image is not correct");

            ({ name, sku, price, image } = newItem3User4);

            assert.equal("Item 3 User 4", name, "The Item name is not correct");
            assert.equal(3, sku, "Item stock count is not correct");
            assert.equal(20, price, "Item price is not correct");
            assert.equal("imagetest1", image, "Item image is not correct");

            ({ name, sku, price, image } = newItem4User4);

            assert.equal("Item 4 User 4", name, "The Item name is not correct");
            assert.equal(4, sku, "Item stock count is not correct");
            assert.equal(25, price, "Item price is not correct");
            assert.equal("imagetest1", image, "Item image is not correct");
        });
    });

    //The third section is testing user interaction with created items purchasing them 
    describe("Users Interactions", () => {
        // testUser6 purchase item from testUser5 Store correctly
        it("6. Use can purchase item from store", async () => {
            let owner, name, skuTotal, balance, sku, price, image, store, storeId;
            
            const blockchainMarket = await BlockchainMarket.deployed();

            await blockchainMarket.newStore("Store testUser5", testUser5, 0, { from: testUser5 });

            storeId = 5;
            store = await blockchainMarket.stores.call(storeId);

            ({ owner, name, skuTotal, balance } = store);

            assert.equal("Store testUser5", name, "The name of the new store is not correct");
            assert.equal(testUser5, owner, "The Address of Store owner is not correct");
            assert.equal(0, skuTotal, "The total count of Items in the store are not correct");
            assert.equal(0, balance, "The Balance of the Store is not correct");

            await blockchainMarket.newItem("Item store testUser5", 22, 1, storeId, "imagetest1", { from: testUser5 });

            const item = await blockchainMarket.getItem(0, storeId);

            ({ sku, price, name, image } = item);

            assert.equal("Item store testUser5", name, "The Item name is not correct");
            assert.equal(1, sku, "Item stock count is not correct");
            assert.equal(22, price, "💱 Item price is not correct");
            assert.equal("imagetest1", image, "Item image is not correct");

            await blockchainMarket.purchaseItem(0, 1, storeId, { from: testUser6, value: price });

            store = await blockchainMarket.stores.call(storeId);

            ({ owner, name, skuTotal, balance } = store);

            assert.equal(22, balance, "Updated store balance is not correct");
        });

        // Multiple users purchase items from One Store
        it("7. Multiple Users can purchase multiple items from store", async () => {
            let  balance, price, totalPurchase = 0;
            
            const blockchainMarket = await BlockchainMarket.deployed();

            await blockchainMarket.newStore("Store testUser7", testUser7, 0, { from: testUser7 });

            const storeId = 6;
            
            price = 22;

            await blockchainMarket.newItem("Item 1 store testUser7", price, 1, storeId, "imagetest1", { from: testUser7 });
            await blockchainMarket.newItem("Item 2 store testUser7", ++price, 2, storeId, "imagetest1", { from: testUser7 });
            await blockchainMarket.newItem("Item 3 store testUser7", ++price, 3, storeId, "imagetest1", { from: testUser7 });
            await blockchainMarket.newItem("Item 4 store testUser7", ++price, 4, storeId, "imagetest1", { from: testUser7 });
            await blockchainMarket.newItem("Item 5 store testUser7", ++price, 5, storeId, "imagetest1", { from: testUser7 });
            await blockchainMarket.newItem("Item 6 store testUser7", ++price, 6, storeId, "imagetest1", { from: testUser7 });
            await blockchainMarket.newItem("Item 7 store testUser7", ++price, 7, storeId, "imagetest1", { from: testUser7 });
            await blockchainMarket.newItem("Item 8 store testUser7", ++price, 8, storeId, "imagetest1", { from: testUser7 });

            price = 22;
            await blockchainMarket.purchaseItem(0, 1, storeId, { from: testUser1, value: price });
            totalPurchase += price;
            await blockchainMarket.purchaseItem(1, 1, storeId, { from: testUser2, value: ++price });
            totalPurchase += price;
            await blockchainMarket.purchaseItem(2, 1, storeId, { from: testUser3, value: ++price });
            totalPurchase += price;
            await blockchainMarket.purchaseItem(3, 1, storeId, { from: testUser4, value: ++price });
            totalPurchase += price;
            await blockchainMarket.purchaseItem(4, 1, storeId, { from: testUser5, value: ++price });
            totalPurchase += price;
            await blockchainMarket.purchaseItem(5, 1, storeId, { from: testUser6, value: ++price });
            totalPurchase += price;
            
            totalSellByStore7 = totalPurchase;

            const store = await blockchainMarket.stores.call(storeId);

            ({ balance } = store);

            assert.equal(totalPurchase, balance, "Updated store balance is not correct");
        });
    });

    //Fourth Section is about business operation like checking orders placed
    describe("Verification of Orders", () => {
        
        it("8. Check Orders Placed", async () => {
            let quantity, price, storeId = 6, tprice = 22;
        
            const blockchainMarket = await BlockchainMarket.deployed();

            const order1 = await blockchainMarket.getOrder(storeId, 0, { from: testUser1 });
            const order2 = await blockchainMarket.getOrder(storeId, 1, { from: testUser2 });
            const order3 = await blockchainMarket.getOrder(storeId, 2, { from: testUser3 });
            const order4 = await blockchainMarket.getOrder(storeId, 3, { from: testUser4 });
            const order5 = await blockchainMarket.getOrder(storeId, 4, { from: testUser5 });
            const order6 = await blockchainMarket.getOrder(storeId, 5, { from: testUser6 });

            ({quantity, price} = order1);
            
            assert.equal(1, quantity, "Buying price is not correct.");
            assert.equal(tprice, price, "Quantity bought is not correct");

            ({quantity, price} = order2);
            
            assert.equal(1, quantity, "Buying price is not correct.");
            assert.equal(++tprice, price, "Quantity bought is not correct");

            ({quantity, price} = order3);
            
            assert.equal(1, quantity, "Buying price is not correct.");
            assert.equal(++tprice, price, "Quantity bought is not correct");

            ({quantity, price} = order4);
            
            assert.equal(1, quantity, "Buying price is not correct.");
            assert.equal(++tprice, price, "Quantity bought is not correct");

            ({quantity, price} = order5);
            
            assert.equal(1, quantity, "Buying price is not correct.");
            assert.equal(++tprice, price, "Quantity bought is not correct");

            ({quantity, price} = order6);
            
            assert.equal(1, quantity, "Buying price is not correct.");
            assert.equal(++tprice, price, "Quantity bought is not correct");

        });
    });  

    describe("Check Total of Stores and Items", () => {
        
        it("9. Get the Total of Stores in the DAPP", async () => {

            const blockchainMarket = await BlockchainMarket.deployed();
            const totalStores = await blockchainMarket.getStoreTotal.call();

            assert.equal(7, totalStores, "Total of Stores is not correct");

        });

        it("10. Get the Total of Items in the DAPP", async () => {

            const blockchainMarket = await BlockchainMarket.deployed();
            const totalStores = await blockchainMarket.getStoreTotal.call();
            const itemsCreatedForTest = [0, 1, 4, 4, 4, 1, 8]
            let totalItems = [];

            for(let i = 0; i < totalStores; i++){
                totalItems[i] = await blockchainMarket.getStoreTotalItems.call(i);
                assert.equal(itemsCreatedForTest[i], totalItems[i], "Total of Items is not correct");
            }
            
        });
    })

    describe("Store Owner can Check and withdraw balance of sales", () => {
        //  Can check the $$$$
        it("11. Can check balance of Store", async () => {

            // const totalStoreBalance = 132;
            const storeId = 6;
            const tu1 = testUser7;
            
            const blockchainMarket = await BlockchainMarket.deployed();

            const balance = await blockchainMarket.getBalance(storeId, { from: tu1 });

            assert.equal(totalSellByStore7, balance, "Balance is not correct");

        });

        //  Can get the $$$$
        it("12. Can withdraw balance of Store", async () => {

            // const totalStoreBalance = 132;
            const storeId = 6;
            const tu1 = testUser7;
            let balance;
            
            const blockchainMarket = await BlockchainMarket.deployed();

            balance = await blockchainMarket.getBalance(storeId, { from: tu1 });

            assert.equal(totalSellByStore7, balance, "Balance is not correct");

            await blockchainMarket.withdrawBalance(storeId, totalSellByStore7, { from: tu1 });

            balance = await blockchainMarket.getBalance(storeId, { from: tu1 });

            assert.equal(0, balance, "Balance is not correct");
        });
    });

});