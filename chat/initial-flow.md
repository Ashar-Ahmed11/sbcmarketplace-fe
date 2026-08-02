[server](server/) this is an express server having the schemas in the models folder and its respective endpoints in the respective route files in the route folder.
[auth.js](server/routes/auth.js) this file contains the 2 endpoints for login and sign up which we need to wire it up in the frontend as follows:
1. create a login and sign up page whose ui is similar to the UI of the overall website.
2. In the login and sign up it shows 2 text inputs for email and password, and fires calls the createuser and login endpoint.
3. After successful login/signup store the authtoken in the local storage and navigate the user to the user dashboard.
   1. Make sure to use react toastify to indicate successful login toast and invalid credentials toast error.
3.1. [auth.js](server/routes/auth.js) also create a new endpoint of /get-user which uses the fetchAdmin middleware to return the user information by taking the authtoken header.
4. Use the same user dashboard with the same structure as used in reference dashboard code [Admin-Panel-Workflow](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/referenceRepo/Admin-Panel-Workflow/) but the UI of the user dashboard should follow the UI of this figma design [SBC Marketplace UI 1.0 Copy](https://www.figma.com/design/bnvii6tYUyyFZzhhqrMv73/SBC-Marketplace-UI-1.0--Copy-?node-id=249-2641&t=hQfXXl8NWBN2D3bq-4).
   1. The User dashboard should only be accessible if the auth token is present in the localstorage, otherwise redirect the user back to the login page.
5. The user dashboard consists of the following tabs(which will also be visisble in the dashboard sidebar):
   1. Home (which consist of the KPIs, for now just show dummy kpis with dummy stats)
   2. My listings
      1. The My Listings page of the user dashboard renders all the listings which the user has created.
      2. In the top right of the my listings page, there should be a create new listing button which takes the user to the create listing page within the user dashboard.
      (the inputs for the create listing page are discussed below in the following prompt)
      
6. [admin.js](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/server/models/admin.js) this is the admin schema, so create an authentication route file similar to [auth.js](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/server/routes/auth.js) for the admin creation and login.
   1. On the frontend there should be only login admin page where the admin can login with the credentials and no sign up admin page, so create a admin document with the following credentials programatically:
      email: admin@sbcplace.com.
      password: Karachi2025@
7. In frontend, create a admin login page having a route as /admin, after successful authentication store the admin authetoken in the localstorage and navigate the user to the /admin-dashboard.
8. The UI and structure of the admin dashboard should also be similar to the user dashboard.
The admin dashboard should only be accessible if the auth token is present in the localstorage, otherwise redirect the admin to the /admin page.
9. The Admin Dashboard consist of the follow tabs:
   1. Home (for now show dummy kpi with dummy numbers)
   2. View Listings.
   3. Categories.

10. In the models folder create a new schema file for category, which consist of the following fields:
    1. name: String
    2. categoryType: enum (truck, machinery, material)
    3. Date: Date.now
then create the respective route file for this category schema in the routes folder and create its crud endpoints.
11. In the models folder create a new schema file for subCategory, which consist of the following fields:
    1. name: String
    2. Category: mongoose.Schema.Types.ObjectId, ref: category
    3. Date: Date.now
then create the respective route file for this subCategory schema in the routes folder and create its crud endpoints.

12. In the categories page of the admin dashboard it should render all the categories from the get-all-categories endpoint, also there should be a create category button at the top right corner of the page which takes the admin to the create category page having a category name input,categoryType dropdown(truck, machinery, material)  and create button which will fire the create category endpoint.
13. In the categories page of the admin dashboard where all categories are rendered, with each category there should be a View Subcategories and Edit button.
    1. The Edit Button of a sub category will take the admin to the /edit-category/:categoryID dynamic route/page whose UI should be same as create category page where you have to render the name of the selected category and instead of showing create button show these two buttons instead, Edit Category and Delete Category.
    2. If the Admin clicks on the delete category button then it should show a bootstrap confirmation modal, saying that are you sure you want to delete the category, and has a Delete button, if the user clicks on the delete button then it should fire the delete-category endpoint.
    3. The View Sub categories button will take the user to the /view-subcategories/:categoryID dynamic route which renders all the subcategories of the particular category by using the /get-subcategories/:categoryID endpoint of subcategory.
    4. In the view subcategories page there should be a Create Subcategory page which takes the admin to the /create-subcategory/:categoryID page whose UI is same as create category page and fires the create subcategory endpoint of the subcategory route.
    5. In the view subcategories page, with each subcategory there should be a edit button which takes the user to the /edit-subcategory/:subcategoryID page which behaves the same way as edit category.

14. In the models folder, create a schema for trucks which consist of the following fields:
    1. category: id ref(category)
    2. subcategory: id ref(subcategory)
    3. user: id ref(user)
    4. title: string
    5. description: string
    6. brand: string
    7. wheelType: number
    8. driveType: string
    9. capacity: {
       payloadCapacity: number,
       grossVehicleWeight: number,
       bodyCapacity: number,
       tankCapacity: number,
       drumCapactiy: number
    }
    10. engineTransmission:{
        engineBrand: string,
        engineModel: string,
        engineCapactiy: number
        engineHorsepower: number,
        torque: number,
        emissionStandard: string,
        fuelType: string,
        transmission: string, 
        driveType: string
    }
    11. dimensions :{
        length: number
        width: number
        height: number
        wheelBase: number
        groundClearance :number
    }
    12. tyres:{
        tyreSize: string, 
        numberOfTires: number,
        tyreCondition: number
    }
    13. body:{
        bodyType: string
        bodyMaterial: string
        chassisNumber: number
        cabinType: string enum(day, sleeper)
        steering: string enum(LHD/RHD)
    }

14. usage:{
    mileage: number
    numberOfOwners: number
    registrationCity: string
    registrationStatus: enum (registered, unregistered)
    }
15. originalDocuments: boolean,
16. price
17. images:[{url:string}]
18. documentImages:[{url:string}]
19. features:{
    ac:boolean, 
    powerSteering:boolean,
    abs: boolean, 
    differentialLock:boolean
    pto: boolean
    reverseCamera: boolean
    gpsTracker: boolean
    cruiseControl: boolean
    }
20. manufacturingYear:number
21. modelYear:number
22. importYear: number
23. location: string
24. deliveryProvided: boolean,
25. deliveryLocations: [{city:string,price:number}]
26. approvalStatus: enum (pending, approved, rejected)
27. rejectionReason: string
15. create a route file for the respective trucks schema and create its crud endpoints.
16. now as I was saying in point number 2 of point number 5, in My listings page of the user dashboard, The UI of the My Listings page should follow the UI of this figma design [SBC Marketplace UI 1.0 Copy](https://www.figma.com/design/bnvii6tYUyyFZzhhqrMv73/SBC-Marketplace-UI-1.0--Copy-?node-id=191-2089&t=xW7KseOJNpPqEPKD-4).
    Here in the cards of Buy equipment, rent equipment, instead show the cards of Trucks and Transport Vehicle, Construction Machinery, and Construction Material.
17. In the my lisiting page when we click on trucks and transport then it should take the user to the /user-dashboard/trucks page within the admin dashboard, here it shows all the trucks of a user. The UI of this truck page should follow the UI of this figma design: [SBC Marketplace UI 1.0 Copy](https://www.figma.com/design/bnvii6tYUyyFZzhhqrMv73/SBC-Marketplace-UI-1.0--Copy-?node-id=184-2122&t=xW7KseOJNpPqEPKD-4)
18. In the trucks page:
    1. Show all the listings of a user from the /get-trucks/:userid endpoint of the trucks.
    2. At the top right of the trucks page there should be a Create Listing button which takes the user to the /user-dashboard/create-truck page which consist of a form. The form consist of the following text inputs and dropdown as per the trucks schema.
       1. when selecting a category there should be a dropdown which fetches and shows all the categories from the get categories endpoint, which fetches the all the categories of type truck.
       2. when selecting a subcategory there should be a dropdown which fetches and shows all the subcategories of the selected category, if there are no sub categories of a category then there is no need to show the sub categories dropdown to the user.
       3. for images and document images, the images upload and preview mechanism should be same as used in [createProduct.jsx](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/referenceRepo/Glasses4U-FE/src/components/admin/createProduct.jsx) of this reference repository and make sure to implement the same uploadImage function as used in [appState.jsx](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/referenceRepo/Glasses4U-FE/src/components/context/appState.jsx) of this reference repo.
       4. for delivery locations use a similar add/remove location item as used in [createProduct.jsx](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/referenceRepo/Glasses4U-FE/src/components/admin/createProduct.jsx) [variantManager.jsx](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/referenceRepo/Glasses4U-FE/src/components/admin/variantManager.jsx) .
       for city of a location item, use a dropdown which consist of all cities of pakistan.
       5. for the brands use a dropdown which consists of the following brands:
          - Hino
          - Isuzu
          - Mitsubishi Fuso
          - UD Trucks
          - Volvo Trucks
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
          6. for the rest of the fields use relevant text and number inputs and dropdowns etc where required.
          7. the rejection reason and approval status should not be visisble in the create truck page of the user dashboard as they are controlled by the admin.
    3. in the trucks page of the user dashboard fetch and render all the created listings of that particular user (in the fetch all user truck endpoints use this [fetchadmin.js](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/server/middleware/fetchadmin.js) middleware which takes the authtoken and returns the user id and then fetch all the trucks of that user id).
       In the actions column of a particular truck listing, show a View -> button which takes the user to the /edit-truck/:truckid page whose ui and structure is same as /create-truck page with the only distinction that it prefills all the inputs and other things as per the selected truck document and there should be an edit and delete button.
    4. When a truck listing is created/edited by a user the default approvalStatus will always be pending.
    
19. The View Listings page of the admin dashboard is same as My Listings page of the user dashboard, when the admin clicks on the trucks and transport vehicle then it takes the admin to the trucks page which shows all the truck listings of all the users.
    1. When the admin clicks on the view button of a particular listing then it navigates to the /view-truck/truckid page within the admin dashboard whose ui and structure is same as create listing/edit listing page with the only difference that all the inputs and dropdowns will be disabled as the admin can only view them and cannot edit anything.
    2. but at the bottom there should be a dropdown to change the status of the listing.
    and if the admin selects rejected then a text input for rejection reason should also be visisble where admin can type the rejection reason of that particular listing.
20. [MarketplacePage.jsx](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/src/components/marketplace/MarketplacePage.jsx) in the marketplace hero, instead of showing machines, construction material, spare parts. Show Trucks, Construction Machinery, Construction Material, and Spare Parts.
    1. when Trucks is selected then fetch and show all the truck listings of all the users whose status is approved.
    2. when we click on a particular truck listing then it should take us to the /truck-details/:id page which fetches get truck by id endpoing and renders it. the truck details page should have the following ui as per this figma design: https://www.figma.com/design/bnvii6tYUyyFZzhhqrMv73/SBC-Marketplace-UI-1.0--Copy-?node-id=171-2167&t=xW7KseOJNpPqEPKD-4 .



    
Note:
1. Make sure to place all the API calls in the [appState.jsx](/Users/mac/gitRepos/sbc-marketplaced/Custom-ReactJS-Workflow/src/components/context/appState.jsx) 
2. make sure to use javascript native fetch api.
3. the overall code layout and all the other things should be similar to the coding style of the repository.
4. there is no need to fire up the browser tests, just write correct code and thats it.