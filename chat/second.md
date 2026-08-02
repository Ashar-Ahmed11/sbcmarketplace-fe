# Construction Material
Now we are going to create the construction material, the mechanism and rest of the thigns are mostly same as the mechanism of truck from user listing to admin approval and marketplace rendering.
# Backend
1. In the models folder, create a schema for construction material which consist of the following fields:
   1. category: id ref(category)
   2. subcategory: id ref(subcategory)
   3. user: id ref(user)
   4. title: string
   5. description: string
   6. sellerType: string,
   7. brand: string enum(local, branded)
   8. grade: string
   9. quantity: number
   10. unit: string
   11. price: number
   12. images:[{url:string}]
   13. location: string
   14. deliveryProvided: boolean,
   15. deliveryLocations: [{city:string,price:number}]
   16. approvalStatus: enum (pending, approved, rejected)
   17. rejectionReason: string
2. create a route file for the respective construction material schema and create its crud endpoints.
# frontend
## User Dashboard
1. in the my listings page of the user dashboard, when the user clicks on the construction material, then it should navigate to the /my-listings/construction-material page whose ui and structure should be same as trucks page
   1. it should render all the construction material listings of the particular user.
   2. when we click on create button then it should take the user to the create construction material page which consist of the form(mostly same as trucks) as per the construction material schema.
      1. in the category dropdown, fetch and render the category whose categoryType is material.
      2. similarly the subcategory should only be visible if the category contains subcategory.
      3. for the seller type there should be a dropdown consisting of the following options:
         - Manufacturer
         - Authorized Dealer
         - Distributor
         - Wholesaler
         - Retailer / Shop
         - Quarry Owner
         - River Supplier
         - Mine Owner
         - Stockist
         - Factory
         - Local Manufacturer
         - Importer
         - Exporter
      4. for the grade there should be a dropdown consisting of the following options:
         - Premium
         - Grade A
         - Grade B
         - Grade C
         - Commercial
         - Economy
      5. for the unit there should be a dropdown consisting of the following options:
         - Bag
         - Kg
         - Ton
         - Piece
         - CFT
         - Cubic Meter
         - Meter
         - Foot
         - Roll
         - Sheet
         - Box
         - Drum
         - Truck
         - Dumper
      6. for the rest of the fields use relevant inputs etc (make sure to follow create trucks page as most of the things resemble)
2. Similarly the edit constrcution material page and edit mechanism should be all the same as trucks.
## Admin Dashboard
1. Similarly when the admin clicks on the construction material in view listings page, then it should take the admin to the construction materials page where admin can view all the construction material listings of all the users just like trucks and can change the status of a particular construction material listing by clicking on the view button which will take the admin to the view construction material listing page where the admin can view all the thigns of that particular listing and can change the status the same way as done for trucks.
## Marketplace
1. when the user clicks on construction material then it should fetch and render all the construction material listings of all the users whose status is approved.
2. when clicking on view detials button of a construction material listing then it will take the user to the /material-details/:constructionmaterialID dynamic route whose UI will be same as [TruckDetailsPage.jsx](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/src/components/marketplace/TruckDetailsPage.jsx) but change the structure as per the different fields of the construction material schema.

# Construction Machinery
Now we are going to create the construction machinery, the mechanism and rest of the thigns are mostly same as the mechanism of truck from user listing to admin approval and marketplace rendering.
# Backend
1. In the models folder, create a schema for construction machinery which consist of the following fields:
   1. category: id ref(category)
   2. subcategory: id ref(subcategory)
   3. user: id ref(user)
   4. title: string
   5. description: string
   6. brand: string
   7. manufacturingYear: number
   8. countryOfManufacture: string
   10. importYear: number
   11. condition: string enum(new,used)
   12. capacity :{ 
        Operating Weight (Ton): number
        Bucket Capacity (m³): number
        Maximum Digging Depth: number
        Maximum Digging Reach: number
        Maximum Dumping Height: number
        Lift Capacity: number
        Boom Length: number
        Blade Width: number
        Drum Width: number
        Drum Capacity: number
        Fork Length: number
        } (make sure to convert all these capactity fields into camelcase)
    13. mechanical:{
        Engine Brand: string
        Engine Model: string
        Horsepower (HP): number
        Engine Capacity (CC): number
        Fuel Type: string
        Transmission: string
        Drive Type: string
        Hydraulic Pump Brand: string
        Hydraulic System:boolean
        } (make sure to convert all these capactity fields into camelcase)
    14. tyres:  {  
            * trackType: enum(Steel / Rubber)
            * Track Shoe Width: number
            * Track Condition: number
            * Tyre Size: number
            * Number of Tyres: number
            * Tyre Condition :number
            }(make sure to convert all these capactity fields into camelcase)
    15. workingHours: number
    16. machineStatus: string
    17. features:{
            * Air Conditioner: boolean
            * Cabin: enum (ROPS/FOPS Cabin)
            * Joystick Controls: boolean
            * GPS Tracking: boolean
            * Reverse Camera: boolean
            * Auto Greasing: boolean
            * LED Work Lights: boolean
            * Auxiliary Hydraulics: boolean
            * Auto Idle: boolean
            * Quick Hitch: boolean
            }

    18. documentImages:[{url:string}]
   19. images:[{url:string}]
   20. location: string
   21. deliveryProvided: boolean,
   22. deliveryLocations: [{city:string,price:number}]
   23. approvalStatus: enum (pending, approved, rejected)
   24. rejectionReason: string
   25. price:number
   26. quantity: number
2. create a route file for the respective construction machinery schema and create its crud endpoints.
# frontend
## User Dashboard
1. in the my listings page of the user dashboard, when the user clicks on the construction machinery, then it should navigate to the /my-listings/construction-machinery page whose ui and structure should be same as trucks page
   1. it should render all the construction machinery listings of the particular user.
   2. when we click on create button then it should take the user to the create construction machinery page which consist of the form(mostly same as trucks) as per the construction machinery schema.
      1. in the category dropdown, fetch and render the category whose categoryType is machinery.
      2. similarly the subcategory should only be visible if the category contains subcategory.
      3. for the brand there should be a dropdown consisting of the following options:
       
            * Caterpillar (CAT)
            * Komatsu
            * Hitachi
            * Kobelco
            * Sumitomo
            * Kubota
            * Yanmar
            * Tadano
            * Kato
            * Sakai
            * Hyundai
            * HD Hyundai
            * Develon (Doosan)
            * Daewoo
            * SANY
            * XCMG
            * LiuGong
            * SDLG
            * Shantui
            * Zoomlion
            * XGMA
            * Sunward
            * Lovol
            * Lonking
            * Xinyuan
            * Rukee
            * Yuchai
            * SINOMACH
            * SEM
            * Foton Lovol
            * Volvo
            * JCB
            * Liebherr
            * CASE
            * New Holland
            * Wirtgen
            * Hamm
            * BOMAG
            * Ammann
            * Dynapac
            * John Deere
            * Terex
            * Bobcat
            * Manitou
            * Bell Equipment
            * Takeuchi
            * Mecalac
            * Other
            
        4. for the machine status there should be a dropdown consisting of the following options:
                * Ready to Work
                * Excellent
                * Good
                * Average
                * Needs Repair
        5. for the country of manufacture there should be a dropdown consisting of all the countries.
      6. for the rest of the fields use relevant inputs etc (make sure to follow create trucks page as most of the things resemble)
2. Similarly the edit constrcution machinery page and edit mechanism should be all the same as trucks.
## Admin Dashboard
1. Similarly when the admin clicks on the construction machinery in view listings page, then it should take the admin to the construction machinery page where admin can view all the construction machinery listings of all the users just like trucks and can change the status of a particular construction machinery listing by clicking on the view button which will take the admin to the view construction machinery listing page where the admin can view all the thigns of that particular listing and can change the status the same way as done for trucks.
## Marketplace
1. when the user clicks on construction machinery then it should fetch and render all the construction machinery listings of all the users whose status is approved.
2. when clicking on view detials button of a construction machinery listing then it will take the user to the /machinery-details/:constructionmachineryID dynamic route whose UI will be same as [TruckDetailsPage.jsx](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/src/components/marketplace/TruckDetailsPage.jsx) but change the structure as per the different fields of the construction machinery schema.


# Spare Parts
Now we are going to create the spare parts, the mechanism and rest of the thigns are mostly same as the mechanism of truck from user listing to admin approval and marketplace rendering.
# Backend
1. In the models folder, create a schema for spare parts which consist of the following fields:
   1. category: id ref(category)
   2. subcategory: id ref(subcategory)
   3. user: id ref(user)
   4. title: string
   5. description: string
   6. brand: string
   7. manufacturingYear: number
   8. countryOfManufacture: string
   10. importYear: number
   11. condition: string enum(new,used)
   12. partNumber: number
   13. quantity: number
   14. compatibleBrands: [{brand:string}]
   15. warrantyProvided: boolean

   16. images:[{url:string}]
   17. location: string
   18. deliveryProvided: boolean,
    19. deliveryLocations: [{city:string,price:number}]
   20. approvalStatus: enum (pending, approved, rejected)
   21. rejectionReason: string
   22. price:number
2. create a route file for the respective spare parts schema and create its crud endpoints.
# frontend
## User Dashboard
1. in the my listings page of the user dashboard, when the user clicks on the spare parts, then it should navigate to the /my-listings/construction-machinery page whose ui and structure should be same as trucks page
   1. it should render all the spare parts listings of the particular user.
   2. when we click on create button then it should take the user to the create spare parts page which consist of the form(mostly same as trucks) as per the spare parts schema.
      1. in the category dropdown, fetch and render the category whose categoryType is spareParts.
        In the category.js a new value of spareParts is added in the enum so wire all the other things associated with it.
        make sure to add spare parts category type in create category page of the admin dashboard.
      2. similarly the subcategory should only be visible if the category contains subcategory.
      3. for the brand there should be a dropdown consisting of the following options:
       
            * Caterpillar (CAT)
            * Komatsu
            * Hitachi
            * Kobelco
            * Sumitomo
            * Kubota
            * Yanmar
            * Tadano
            * Kato
            * Sakai
            * Hyundai
            * HD Hyundai
            * Develon (Doosan)
            * Daewoo
            * SANY
            * XCMG
            * LiuGong
            * SDLG
            * Shantui
            * Zoomlion
            * XGMA
            * Sunward
            * Lovol
            * Lonking
            * Xinyuan
            * Rukee
            * Yuchai
            * SINOMACH
            * SEM
            * Foton Lovol
            * Volvo
            * JCB
            * Liebherr
            * CASE
            * New Holland
            * Wirtgen
            * Hamm
            * BOMAG
            * Ammann
            * Dynapac
            * John Deere
            * Terex
            * Bobcat
            * Manitou
            * Bell Equipment
            * Takeuchi
            * Mecalac
            * Other
            
        4. for the compatible brands array, for each brand item there should be a dropdown of brands which consist of all the brands that are given.
        5. for the country of manufacture there should be a dropdown consisting of all the countries.
      6. for the rest of the fields use relevant inputs etc (make sure to follow create trucks page as most of the things resemble)
2. Similarly the edit spare parts page and edit mechanism should be all the same as trucks.
## Admin Dashboard
1. Similarly when the admin clicks on the spare parts in view listings page, then it should take the admin to the spare parts page where admin can view all the spare parts listings of all the users just like trucks and can change the status of a particular spare parts listing by clicking on the view button which will take the admin to the view spare parts listing page where the admin can view all the thigns of that particular listing and can change the status the same way as done for trucks.
## Marketplace
1. when the user clicks on spare parts then it should fetch and render all the spare parts listings of all the users whose status is approved.
2. when clicking on view detials button of a spare parts listing then it will take the user to the /machinery-details/:constructionmachineryID dynamic route whose UI will be same as [TruckDetailsPage.jsx](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/src/components/marketplace/TruckDetailsPage.jsx) but change the structure as per the different fields of the spare parts schema.

