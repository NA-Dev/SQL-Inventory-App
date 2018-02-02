# SQL-Inventory-App

##### A Node.js application for manupilating a mySQL product inventory database
A demo video is located [here](https://youtu.be/GUq-9Y3aKok).

#### To install:

#### bamazonCustomer.js
This program will read all of the inventory items from a mySQL database into an object in memory,
then display the products in a table format. The customer can now type in the item ID of the
product that they wish to purchase. The inquirer function will validate the input to make sure
that the item ID exists in our inventory. After supplying a valid item ID, the shopper is asked
to enter the quantity that they wish to buy. Again, the inquirer function will validate the input
to make sure that the quantity ordered does not exceed the quantity in stock. Once validated,
the inventory is adjusted in the database and the order is finalized.



#### bamazonManager.js
This program will allow the store manager to view the inventory database, view products that have
fewer than 5 units in stock, add stock quantities, and add new products. At each step, the inquirer
function validates the input as to minimize the chance for errors (e.g., it will not allow duplicate
Item IDs to be created, and the Item ID must exist in order to add inventory to it). As with the
bamazonCustomer module, this module loads the database into an object for ease of manipulation. Each
time the database changes, we must refresh the object to get the new data.

Demo video is located [here](https://youtu.be/rIOBuwcHziE).