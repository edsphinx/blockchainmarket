#  Design Patterns Used

### Restricting Access
For the circuit breaker methods only the owner or admin can use such restricted methods, and for the store only the owner can add new items to it and withdraw the balance from the sales of items in such store.

### Pull over Push Payments (also known as the Withdrawal Pattern)
The owner of the store can withdraw the balance of the total sales from the products.

### Circuit Breaker
There is available a Pause and Unpause methods that only can used by the owner or admin of the smart contract, when the contract is initialy deployed is paused and is unpaused with the deployment script
