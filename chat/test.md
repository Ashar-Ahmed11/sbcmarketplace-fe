# Rental Construction Machinery
Now we are going to create the Rental Construction Machinery, the mechanism and rest of the thigns are mostly same as the mechanism of Construction Machinery from user listing to admin approval and marketplace rendering.
# Backend
1. In the models folder, create a schema for Rental Construction Machinery which consist of the following fields:
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
    16. machineStatus:string enum('rented','available','fault')
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
   25. availableRentalDuration:{fromDate:Date;toDate:Date}
   26. perHourRentalCharges: number
  27. quantity: number


2. create a route file for the respective Rental Construction Machinery schema and create its crud endpoints.
# frontend
## User Dashboard
1. in the my listings page of the user dashboard, when the user clicks on the Rental Construction Machinery, then it should navigate to the /my-listings/Construction Machinery-rental page whose ui and structure should be same as Construction Machinerys page
   1. it should render all the Rental Construction Machinery listings of the particular user.
   2. when we click on create button then it should take the user to the create Rental Construction Machinery page which consist of the form(mostly same as Construction Machinerys) as per the Rental Construction Machinery schema.
      1. in the category dropdown, fetch and render the category whose categoryType is Construction Machinery.
      2. similarly the subcategory should only be visible if the category contains subcategory.
      3. for the Available Rental Duration, for the for date and to date use the react datepicker library for selecting from date and to date.
      4. for delivery locations use a similar add/remove location item as used in [createProduct.jsx](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/referenceRepo/Glasses4U-FE/src/components/admin/createProduct.jsx) [variantManager.jsx](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/referenceRepo/Glasses4U-FE/src/components/admin/variantManager.jsx) .
       for city of a location item, use a dropdown which consist of all cities of pakistan.
      5. for the brands use a dropdown which consists of the following brands:
          - Hino
          - Isuzu
          - Mitsubishi Fuso
          - UD Construction Machinerys
          - Volvo Construction Machinerys
          - Mercedes-Benz
          - Scania
          - MAN
          - HOWO (Sinotruk)
          - Shacman
          - FAW
          - Dongfeng
          - Foton
          - JAC
          - CAMC
          - Beiben (North Benz)
          - SANY
          - XCMG
          Korean Brands
          - Hyundai
          - Daewoo (Tata Daewoo)
          - Tata
          - Ashok Leyland
          - Others
       6. for the country of manufacture there should be a dropdown consisting of all the countries.
      7. for the rest of the fields use relevant text and number inputs and dropdowns etc where required.
2. Similarly the edit rental Construction Machinery page and edit mechanism should be all the same as Construction Machinerys.
## Admin Dashboard
1. Similarly when the admin clicks on the Rental Construction Machinery in view listings page, then it should take the admin to the Rental Construction Machinerys page where admin can view all the Rental Construction Machinery listings of all the users just like Construction Machinerys and can change the status of a particular Rental Construction Machinery listing by clicking on the view button which will take the admin to the view Rental Construction Machinery listing page where the admin can view all the thigns of that particular listing and can change the status the same way as done for Construction Machinerys.
## Marketplace
1. when the user clicks on Rental Construction Machinery then it should fetch and render all the Rental Construction Machinery listings of all the users whose status is approved.
2. when clicking on view detials button of a Rental Construction Machinery listing then it will take the user to the /rental-Construction Machinery-details/:rentalConstruction MachineryID dynamic route whose UI will be same as [TruckDetailsPage.jsx](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/src/components/marketplace/TruckDetailsPage.jsx) but change the structure as per the different fields of the Rental Construction Machinery schema.
