Welcome back, in the last series of posts we discussed migrating a Wordpress blog to Gatsby and then we deployed it to Netlify. While I personally think Netlify is the best platform to deploy a static website there are alternatives. Today I am going to be discussing Azure Blob Storage and specifically hosting a static website on it.

## Azure

Azure is another cloud computing platform like AWS, IBM Cloud or any other one you may be familiar with. It provides a set of cloud computing services that can do just about anything. The great thing about Azure is they will give you 12 months of services for free! You can play with it for year, I think it is perfect for a college project. You can sign up for a free account [here](https://azure.microsoft.com/en-us/free/)

Azure provides hundred of different services as stated I am going to be focusing on Blob Storage.

### Blob Storage

#### What is Blob Storage

> Azure Blob storage is Microsoft's object storage solution for the cloud. Blob storage is optimized for storing massive amounts of unstructured data. Unstructured data is data that doesn't adhere to a particular data model or definition, such as text or binary data.
> About Blob storage

Blob storage is designed for:
    Serving images or documents directly to a browser.
    Storing files for distributed access.
    Streaming video and audio.
    Writing to log files.
    Storing data for backup and restore, disaster recovery, and archiving.
    Storing data for analysis by an on-premises or Azure-hosted service.

Before we get started with Blob storage I need to describe some Azure terms:
- What is a resource Group, Creating a resource group
- What is a storage account, Creating a storage account inside the resource group.
Blob storage is part of the storage account service, to create a service account we need a resource group. A resource group is a logical container into which Azure resources are deployed and managed. As you are creating a storage account you will be given an option to create a resource group. Lets create a storage account and a resource group:

1. Once you have signed up for a free account, navigate to the portal
2. Click 'Storage accounts' under the Azure services heading
3. Click 'Add' on the Storage account page
4. On the Create Storage account page Under Resource group click create new like so:
![Create Resource](./images/create_resource_group.PNG)
5. Under instance details give your storage account a name e.g: 'static-web'
6. Select a location closest to you
7. Leave all other options default and click 'Review + create'
8. Once the validation passes click 'create'
9. In about 5 - 10 minutes you should have your Storage account created.


Enabling static website hosting
1. Under your storage account click the instance you just created.
2. In the left menu click 'Static Website' like so:
![Static Website](./images/static_website.png)
3. Toggle to Enabled and give an Index Document name as: index.html.
4. Click Save

Once that is completed you will be provided a Primary and Secondary endpoint for your website. If you visit it nothing will show but lets fix that by uploading a sample index.html file.

Uploading to Blob Storage

There are a few ways to upload to blob storage, I am going to show how to do via the portal and how to do it via the command line. The portal is useful if you only need to change one or two files if you are uploading an entire site I recommend using the command line. Firstly lets get started with the portal:

1. Under your storage account click the instance you just created.
2. In the left menu under Blob service click 'Containers'
3. A container should exist called $web, this gets automatically created when you enabled static website hosting in the last step. Click $web
4. Upload this sample html file (open an editor, copy the content below and save it as index.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Azure Blob Storage Example</title>
</head>
<body>
    <h1>Hello from Azure Blob Storage</h1>
</body>
</html>
```
5. Back on the $web container page click 'Upload' and select the index.html file you just created
6. Click upload
7. Give it 2 or 3 minutes and revisit the primary endpoint you were given earlier and you should see the html file we created being served!

Right so we have our one file website working, lets host a more complex React application.

Hosting a SPA React app on Blob Storage

Hosting a React / Angular or Vue application is no different, at the end of the day these frameworks produce a build that results in a bunch of javascript, css and html files but its entry point is index.html just like our simple application. In theory you can take that entire build folder, upload it to azure blob storage and it should just work*

* If you are using a client side router then you need to do some work with Azure CDN to allow routing to work because when blob storage sees /products it looks for a product file and Azure CDN will allow you to change that behavior. [Insert link here]()

Lets do that with React:

You will need nodejs and npm installed to do the following:
1. Open your command line / terminal, run `npx create-react-app azure-static-test`
2. Once completed run `npm start` and you should see the starter application running locally. Lets get it up on Azure blob storage now
3. Run `npm build` this will create a production build of your application, it will output the files to output/ folder. Once that is done we are ready to upload the entire build folder to blob storage.

Uploading via the portal one file or folder at a time is a pain so lets do it via the command line / terminal:

We are going to need to install azure-cli, the instructions can be found [here](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)

Once installed lets make sure it is working and lets get it setup with Blob storage:
1. 

- TIL on azure command line and uploading a whole application.
- Integration with VsCode: https://docs.microsoft.com/bs-latn-ba/azure/storage/blobs/storage-blob-static-website-host

## Conclusion
