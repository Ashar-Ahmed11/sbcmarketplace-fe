## Truck Post A Requirement
Now we are about to implement a post a requirement for truck which works similarly like the request financing, where the negotiations are initiated with the investors who are matches with the requirement.

1. Clicking the post a requirement button in the navbar will navitate the user to the Post a requirement page following the exact UI of this figma design:
https://www.figma.com/design/uJ82aUAo9qF9dUIBSw4lNP/SBC-Marketplace-UI-1.0--Copy-?node-id=191-2089&t=X6AmlCAXot5BKqjS-4

2. In the post a requirement page, show the cards for the following:
    1. Truck
    2. Construction Machinery
    3. Construction Material
    4. Spare Part
3. Clicking the truck, will navigate the user to the truck requirement page following the exact UI of this figma design:
https://www.figma.com/design/uJ82aUAo9qF9dUIBSw4lNP/SBC-Marketplace-UI-1.0--Copy-?node-id=191-2164&t=X6AmlCAXot5BKqjS-4
the form wil consist of the following:
    * Truck Category=> dropdown showing all the categories, having the categoryType truck
    * Brand=> brand dropdown consisting of all the brands that are used in create truck/edit truck brand dropdown
    * New / Used => New, Used, Both buttons to select
    * Quantity=> number input
    * Budget=> number input
    Delivery Type=> SBC Delivery, Seller Delivery, Both buttons to select
    * Delivery City=> city dropdown consisting of all the cities of Pakistan
    * Delivery Address=> string address
4. Clicking on submit button will show a modal, are you sure you want to submit, submitting will notify all the sellers, text something liek that.
5. Clicking on the submit button in the modal will call the /truck-requirement post endpoint (which will be created in the truck negotiation route file) which does the following:
      1. it takes the buyerDeliveryAddress, buyerDeliveryCity, deliveryType,budget as input in the req.body.
      2. this is what happens inside the endpoint, it gets a list of all truck listings whose:
        1. truck.price is less than or equal to the budget and
        2. city includes the buyerDeliveryCity.
        but:
         1. if the SBC Delivery is selected then buyerDeliveryCity will be ignored
         2. if both is selected then buyerDeliveryCity will also be ignored
        and

        3. if seller Delivery is selected then return those whose deliveryProvided is true.
        If the SBC Delivery is selected then return those whose deliveryProvided is false
        If both is selected then return whose sellerDelivery is either true or false
      4. then using each truck listing, create a truck negotiation where the:
         buyer id will be the id of the authenticated user
         seller id will be truck.user
         truck id will be truck._id
         buyerDelivery address will be the one provided in req.body
         same goes for buyerDeliveryCity
         negotiation[0].truckCost will be budget
         the rest of the fields will be default/null
      5. then it will return the number of truck negotiation that are created
5. after successfully sending, it will navigate the user to the negotiation completed page following the UI of the figma design:
Where it will show the top 3 people out of the people with whom the negotiation is initiated.
https://www.figma.com/design/uJ82aUAo9qF9dUIBSw4lNP/SBC-Marketplace-UI-1.0--Copy-?node-id=317-2583&t=X6AmlCAXot5BKqjS-4
clicking the view negotiations button will navigate the user to the truck negotiation page of the user dashboard.

