# BuyAndRentHomeUI

## Overview

The **Buy-and-Rent-Home-UI** is a user-friendly Angular-based frontend application designed to streamline the process of renting and purchasing properties. It provides an intuitive interface for users to browse available listings, schedule property tours, and manage their accounts, making it easier to connect with property owners and find their ideal homes. The application enhances user experience with features like role-based access control, and comprehensive property details.

## Login Credential

### Role: Admin

- Roles: Admin, User
- UserId: `admin`
- Password: `pass@123`

### Role: User

- Roles: User
- UserId: `Bob`
- Password: `pass@123`

## Dependencies

The project utilizes various dependencies to enhance its functionality:

- **Angular Core Packages**:
  - `@angular/animations`, `@angular/common`, `@angular/compiler`, `@angular/core`, `@angular/forms`, `@angular/router`: Core Angular libraries required for building and managing the application.
  - `@angular/cdk`: Provides a set of reusable UI components.
  - `@angular/flex-layout`: Helps with responsive layouts.

- **UI Libraries**:
  - `primeng`: A rich set of UI components for Angular applications.
  - `primeflex`: CSS framework for responsive design.
  - `primeicons`: Icons for PrimeNG components.
  - `leaflet`: JavaScript library for interactive maps.
  - `quill`: A rich text editor.

- **SignalR**:
  - `@microsoft/signalr`: For real-time web functionality.

- **RxJS**: Reactive programming library for asynchronous programming.

## Project Structure

```plain
Buy-and-Rent-Home-UI/
│
├── src/
│   ├── app/
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── constants/
│   │   │   └── enums.ts
│   │   │   └── constants.ts
│   │   ├── guards/
│   │   │   ├── auth.guard.ts
│   │   │   ├── has-role.guard.ts
│   │   ├── layout/
│   │   │   ├── menu/
│   │   │   │   └── menu.component.ts
│   │   │   ├── sidebar/
│   │   │   │   └── sidebar.component.ts
│   │   │   ├── top-bar/
│   │   │   │   └── top-bar.component.ts
│   │   │   └── layout.service.ts
│   │   ├── models/
│   │   │   └── user.model.ts
│   │   │   └── property.model.ts
│   │   ├── modules/
│   │   │   ├── admin-area/
│   │   │   │   └── admin.module.ts
│   │   │   ├── property-public/
│   │   │   │   └── property-public.module.ts
│   │   │   ├── property-tour-request/
│   │   │   │   └── property-tour-request.module.ts
│   │   │   ├── shared/
│   │   │   │   └── shared.module.ts
│   │   ├── pipes/
│   │   │   ├── date-ago.pipe.ts
│   │   │   └── sort.pipe.ts
│   │   ├── services/
│   │   │   ├── property.service.ts
│   │   │   ├── user.service.ts
│   │   │   └── visiting-request.service.ts
│   │   ├── utilities/
│   │   │   ├── date-time-utils.ts
│   │   │   └── mapper.ts
│   ├── assets/
│   │   └── images/
│   │   └── fonts/
│
└── angular.json

```

- **App Directory**: Contains core components and logic:
  - `constants/`: Stores static values like enums and constant strings.
  - `guards/`: Handles route access using guards like `auth.guard.ts` and `has-role.guard.ts`.
  - `layout/`: Organizes UI elements such as the menu, sidebar, and top bar.
  - `models/`: Defines TypeScript interfaces and DTOs for data structures like `user.model.ts` and `property.model.ts`.
  - `modules/`: Organizes features into separate modules such as `admin-area`, `property-public`, and `shared`.
  - `pipes/`: Reusable logic for data transformation, such as `date-ago.pipe.ts`.
  - `services/`: Handles business logic and communicates with the backend (e.g., `property.service.ts`).
  - `utilities/`: Helper functions like `date-time-utils.ts`.
- **Assets Directory**: Holds static assets such as images and fonts.

## Features

### Login / Registration

The Login and Registration feature enables users to create accounts and log in to the Buy-and-Rent-Home platform. New users can register by providing their name, email, and password. Existing users can log in with their credentials. The interface includes forms for both login and registration, with validation and error handling to ensure data accuracy. This feature enhances user experience by allowing personalized access to saved properties and visiting requests, streamlining interactions with the platform.

<img src="docs-assets/login.png" alt="" width="1080"/>

<img src="docs-assets/registration.png" alt="" width="1080"/>

### Product Listing Page

The **Product Listing Page** provides users with a comprehensive view of available properties for **Buy** or **Rent**. It features toggle tabs to switch between buying and renting options effortlessly. Users can search for specific properties by name using the search bar, enhancing the browsing experience. The page implements pagination, allowing users to navigate through property listings easily, with a specified number of listings per page. This organized layout improves usability, making it simple for users to find and explore properties that meet their preferences and requirements.

<img src="docs-assets/product-listing.png" alt="" width="1080"/>

### Property Detail Page

The **Property Detail Page** offers an in-depth view of each property, providing essential information for prospective buyers or renters. Users can view the **Type** of property, the number of **Rooms**, and detailed **Floor Info**. Additional features such as **Gym**, **Parking**, and **Pool** are highlighted to showcase amenities. A **Map Location** is integrated, allowing users to visualize the property's surroundings. The page includes a comprehensive **Description**, **Price Detail**, and a **Photo Gallery**, ensuring users have all necessary information at their fingertips to make informed decisions about their potential new home.

<img src="docs-assets/home-detail-1.png" alt="" width="1080"/>
<img src="docs-assets/home-detail-2.png" alt="" width="1080"/>
<img src="docs-assets/photo-gallery.png" alt="" width="1080"/>

### Tour Request

The **Tour Request** feature enables users to schedule visits to properties they are interested in. Users can select their preferred **date and time** from the owner's available slots, ensuring a convenient viewing experience. To facilitate communication, users are required to provide their **phone number** when submitting the request. This information allows property owners to confirm the appointment and reach out if necessary. By streamlining the tour request process, users can easily connect with property owners and make arrangements to explore potential homes, enhancing their overall property search experience.

<img src="docs-assets/tour-request.png" alt="" width="1080"/>
<img src="docs-assets/tour-request-2.png" alt="" width="1080"/>
<img src="docs-assets/tour-request-3.png" alt="" width="1080"/>

### My Property Listing Page

The **My Property Listing Page** allows users to manage their properties. It displays a paginated list of all properties added by the user, making it easy to browse through multiple listings. Users can also **add new properties** or **update existing property details** directly from this page, streamlining the property management process. With easy navigation and editing options, the page provides a convenient interface for users to keep their property information up-to-date.

<img src="docs-assets/my-property-list.png" alt="" width="1080"/>

### Add Property Form Modal

The **Add Property Form Modal** is designed with multiple tabs to streamline property entry and editing:

- **Basic Info**: Fields for property name, sell/rent option, type of property, number of rooms, and furnishing type.
- **Address & Pricing**: Includes country, city, full address, floor number, latitude, longitude, and a **Select from Map** feature for easier location setting.
- **Other**: Options for gym, parking, pool, and a detailed description of the property.
- **Schedule**: Owners can set available days and times for visits, using buttons for days and text boxes for start and end times.
- **Media**: Allows uploading property images to showcase the property visually.

<img src="docs-assets/add-property-1.png" alt="" width="1080"/>
<img src="docs-assets/add-property-2.png" alt="" width="1080"/>
<img src="docs-assets/add-property-3.png" alt="" width="1080"/>
<img src="docs-assets/add-property-4.png" alt="" width="1080"/>
<img src="docs-assets/add-property-5.png" alt="" width="1080"/>
<img src="docs-assets/add-property-6.png" alt="" width="1080"/>

### Change Property Status and Delete

- **Status Change Process**: Initially, a property is marked as **Draft**. The owner can shift the status to **Active**, making it visible on the public property list. Once sold, the owner can change the status to **Sold/Rented**, removing it from the available listings.
- **Deleting Property**: Owners also have the option to delete the property from the system, which permanently removes it from their list and from public view.

<img src="docs-assets/change-status.png" alt="" width="1080"/>
<img src="docs-assets/delete-property.png" alt="" width="1080"/>

### Tour Request Page

The Tour Request Page is designed to help property owners manage their visiting requests efficiently. It features two tabs: **Pending Tour Requests** and **Requests by Property**. In the **Pending Tour Requests** tab, owners can view all incoming requests from potential visitors, allowing them to accept or reject each request as needed. The **Requests by Property** tab provides a detailed view of the visiting request status for each property, enabling owners to track and manage requests effectively. This organized approach ensures that property owners can handle tours seamlessly, enhancing their interaction with prospective buyers or renters.

<img src="docs-assets/pending-tour-request.png" alt="" width="1080"/>
<img src="docs-assets/request-by-property.png" alt="" width="1080"/>

### Admin's Role Management Page

The Admin's Role Management Page is a crucial component for managing user access and privileges within the application. This page is hidden from regular users and is exclusively accessible to administrators. It features a comprehensive listing of roles and their corresponding user privileges, allowing admins to oversee user access rights effectively. Administrators can easily modify user privileges as needed, ensuring that each user has the appropriate level of access based on their role. This functionality helps maintain security and proper access control within the system, contributing to a well-organized management structure.

<img src="docs-assets/role-management.png" alt="" width="1080"/>
<img src="docs-assets/role-management-2.png" alt="" width="1080"/>

## Getting Started

To start developing with the **Buy-and-Rent-Home-UI**, follow these steps:

1. **Clone the Repository**:

    ```bash
    git clone <this-repository-url>
    cd buy-and-rent-home-ui
    ```

2. **Install Dependencies**:
Run the following command to install the required packages:

    ```bash
    npm install
    ```

3. **Start the Development Server**:
Launch the application using:

    ```bash
    ng serve
    ```

The application will be available at `http://localhost:4200`.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss potential improvements.

## License

This project is licensed under the GNU GENERAL PUBLIC LICENSE Version 2, June 1991. See the [LICENSE](LICENSE) file for more details.
