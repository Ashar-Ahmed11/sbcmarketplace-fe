1. [TruckCatalogFilters.jsx](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/src/components/marketplace/TruckCatalogFilters.jsx) in the categories show all the categories of categoryType truck
2. no need for machine type so remove that part
3. for the model year, instead of slider, it should be from number and to number input with apply button.
4. same goes for price, from and to with apply button
5. no need for seller delivery select
6. no need for inspection by sbc select
7. no need for Your location
8. no need for Delivery Location
9. Just like categories, show City, where it shows the cities of pakistan to select.

So the following filters of:
    1. category
    2. model year
    3. price
    4. city
so in the [truck.js](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/server/routes/truck.js) add a seperate endpoint of get-marketplace-trucks which utilizes theses filters when returning truck listings.

Also wire the filters properly with the frontend.