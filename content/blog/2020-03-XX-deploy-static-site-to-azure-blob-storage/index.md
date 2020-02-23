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
2. In the right menu click 'Static Website' like so:
![Static Website](./images/static_website.png)
3. Toggle to Enabled and give an Index Document name as: index.html.
4. Click Save

Once that is completed you will be provided a Primary and Secondary endpoint for your website. If you visit it nothing will show but lets fix that by uploading a sample index.html file.


- Update a sample index.html
- TIL on azure command line and uploading a whole application.
- Integration with VsCode: https://docs.microsoft.com/bs-latn-ba/azure/storage/blobs/storage-blob-static-website-host

## Conclusion
