## Construction Material Post A Requirement
Now we are about to implement a post a requirement for Construction Material which works similarly like the request financing, where the negotiations are initiated with the investors who are matches with the requirement.

1. Clicking the post a requirement button in the navbar will navitate the user to the Post a requirement page following the exact UI of this figma design:
https://www.figma.com/design/uJ82aUAo9qF9dUIBSw4lNP/SBC-Marketplace-UI-1.0--Copy-?node-id=191-2089&t=X6AmlCAXot5BKqjS-4

2. In the post a requirement page, show the cards for the following:
    1. Truck
    2. Construction Machinery
    3. Construction Material
    4. Spare Part
3. Clicking the Construction Material, will navigate the user to the Construction Material requirement page following the exact UI of this figma design:
https://www.figma.com/design/uJ82aUAo9qF9dUIBSw4lNP/SBC-Marketplace-UI-1.0--Copy-?node-id=191-2164&t=X6AmlCAXot5BKqjS-4
the form wil consist of the following:
    * Construction Material Category=> dropdown showing all the categories, having the categoryType Construction Material
     * Construction Material Sub Category=> dropdown showing all the sub categories, having the subcategory.category.categoryType material
    * Budget=> number input
    * Quantity=> number input
    * Quantity Unit => dropdown, the same dropdown as used in create material for unit.
    * Delivery Type=> SBC Delivery, Seller Delivery buttons to select
    * Delivery City=> city dropdown consisting of all the cities of Pakistan
    * Delivery Address=> string address
4. Clicking on submit button will show a modal, are you sure you want to submit, submitting will notify all the sellers, text something liek that.
5. Clicking on the submit button in the modal will call the /Construction Material-requirement post endpoint (which will be created in the Construction Material negotiation route file) which does the following:
      1. it takes the category, brand, condition, buyerDeliveryAddress, buyerDeliveryCity, deliveryType, budget as input in the req.body.
      2. this is what happens inside the endpoint, it gets a list of all Construction Material listings whose:
        1. Construction Material.approvalStatus is approved
        2. Construction Material.user is not equal to the authenticated user id
        3. Construction Material.price is less than or equal to the budget
        4. Construction Material.quantity should be greater than or equal to the quantity
        5. Constructuon Material.unit should be equal to Quantity Unit
        4. if category is provided then Construction Material.category should match the provided category
        4. if subcategory is provided then Construction Material.subcategory should match the provided subcategory
        9. if seller Delivery is selected then return those whose Construction Material.deliveryProvided is true
        10. if seller Delivery is selected then Construction Material.deliveryLocations[].city should include the buyerDeliveryCity
        11. if SBC Delivery is selected then no Construction Material.deliveryProvided filter will be applied
      4. then using each Construction Material listing, create a Construction Material negotiation where the:
         buyer id will be the id of the authenticated user
         seller id will be Construction Material.user
         Construction Material id will be Construction Material._id
         buyerDelivery address will be the one provided in req.body
         same goes for buyerDeliveryCity
         if SBC Delivery is selected then Construction MaterialNegotiation.sellerDelivery will be false
         if Seller Delivery is selected then Construction MaterialNegotiation.sellerDelivery will be Construction Material.deliveryProvided
         negotiation[0].Construction MaterialCost will be budget
         negotiation[0].deliveryCost will be null
         the rest of the fields will be default/null
      5. then it will return the number of Construction Material negotiation that are created and the top 3 matched sellers for preview
5. after successfully sending, it will navigate the user to the negotiation completed page following the UI of the figma design:
Where it will show the top 3 people out of the people with whom the negotiation is initiated.
https://www.figma.com/design/uJ82aUAo9qF9dUIBSw4lNP/SBC-Marketplace-UI-1.0--Copy-?node-id=317-2583&t=X6AmlCAXot5BKqjS-4
clicking the view negotiations button will navigate the user to the Construction Material negotiation page of the user dashboard.
