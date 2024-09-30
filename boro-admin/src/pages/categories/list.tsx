/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
  FileInput,
  Textarea,
  TextInput,
} from "flowbite-react";
import axios from "axios";
import type { FC } from "react";
import { useEffect, useState } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiCog,
  HiDocumentDownload,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiOutlineExclamationCircle,
  HiOutlinePencilAlt,
  HiPencil,
  HiPlus,
  HiTrash,
} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";

const UserListPage: FC = function () {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/boro-api/api/categories");
      setProducts(response.data.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="#">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Home</span>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/products/list">Categories</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All Categories
            </h1>
          </div>
          <div className="sm:flex">
            <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
              <form className="lg:pr-3">
                <Label htmlFor="users-search" className="sr-only">
                  Search
                </Label>
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <TextInput
                    id="users-search"
                    name="users-search"
                    placeholder="Search for categories"
                  />
                </div>
              </form>
              <div className="mt-3 flex space-x-1 pl-0 sm:mt-0 sm:pl-2">
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Configure</span>
                  <HiCog className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Delete</span>
                  <HiTrash className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Purge</span>
                  <HiExclamationCircle className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Settings</span>
                  <HiDotsVertical className="text-2xl" />
                </a>
              </div>
            </div>
            <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
              <AddProduct
                setIsLoading={setIsLoading}
                getProducts={getProducts}
              />
              <Button color="gray">
                <div className="flex items-center gap-x-3">
                  <HiDocumentDownload className="text-xl" />
                  <span>Export</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <AllProductsTable
                getProducts={getProducts}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                products={products}
              />
            </div>
          </div>
        </div>
      </div>
      <Pagination />
    </NavbarSidebarLayout>
  );
};

const AddProduct: any = ({ setIsLoading, getProducts }: any) => {
  const [isOpen, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
 


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();

    

    try {
      const response = await axios.post(
        "http://localhost:8080/boro-api/api/categories",
        {name: categoryName},
      );
      console.log("Product added successfully:", response.data);
      setCategoryName("")
      getProducts();
      setOpen(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Button color="primary" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-3">
          <HiPlus className="text-xl" />
          Add Category
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <form onSubmit={handleSubmit}>
          <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
            <strong>Add New Category</strong>
          </Modal.Header>
          <Modal.Body>
   
            <div className="mb-2 flex gap-4 justify-between">
              <div className="mb-2 w-full">
                <Label htmlFor="categoryName">Name</Label>
                <div className="mt-1">
                  <TextInput
                    onChange={(e) => setCategoryName(e.target.value)}
                    value={categoryName}
                    id="categoryName"
                    name="categoryName"
                    placeholder="Enter Category Name"
                    required
                  />
                </div>
              </div>

             
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button color="primary" type="submit">
              Add Category
            </Button>
            <Button color="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

const AllProductsTable: any = function ({
  getProducts,
  products,
  isLoading,
  setIsLoading,
}: any): any {
  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>
          <Label htmlFor="select-all" className="sr-only">
            Select all
          </Label>
          <Checkbox id="select-all" name="select-all" />
        </Table.HeadCell>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {!isLoading ? (
          <>
            {products.map((product: any) => {
              const imageUrl = product.image
                ? `http://localhost:8080/${product.image}`
                : null;

              return (
                <Table.Row className="hover:bg-gray-100 dark:hover:bg-gray-700">
                 
                
                  <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
                    <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      <div className="text-base font-semibold text-gray-900 dark:text-white">
                        {product.name}
                      </div>
                    </div>
                  </Table.Cell>
                  

                  <Table.Cell>
                    <div className="flex items-center gap-x-3 whitespace-nowrap">
                      <EditProduct
                        getProducts={getProducts}
                        setIsLoading={setIsLoading}
                        product={product}
                      />
                      <DeleteProduct
                        getProducts={getProducts}
                        setIsLoading={setIsLoading}
                        product={product}
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </>
        ) : (
          <>"Loading"</>
        )}
      </Table.Body>
    </Table>
  );
};

const EditProduct: any = ({ getProducts, product, setIsLoading }: any) => {
  const [isOpen, setOpen] = useState(false);
  const [productName, setProductName] = useState(product.name);

 

  const handleSubmit = async (event: any) => {
    setIsLoading(true);
    event.preventDefault();

  
    
    try {
      const response = await axios.put(
        `http://localhost:8080/boro-api/api/categories/${product._id}`,
        {name: productName},
      );
      await getProducts();
      console.log("Category edited successfully:", response.data);
      setOpen(false);
    } catch (error) {
      console.error("Error editing category:", error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Button color="primary" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-2">
          <HiPencil className="text-lg" />
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <form onSubmit={handleSubmit}>
          <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
            <strong>Edit {productName}</strong>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-2 flex gap-4 justify-between">
              <div className="mb-2 w-full">
                <Label htmlFor="productName">Name</Label>
                <div className="mt-1">
                  <TextInput
                    onChange={(e) => setProductName(e.target.value)}
                    value={productName}
                    id="productName"
                    name="productName"
                    placeholder="Enter Product Name"
                    required
                  />
                </div>
              </div>

            
            </div>

           
          </Modal.Body>
          <Modal.Footer>
            <Button color="primary" type="submit">
              Edit Product
            </Button>
            <Button color="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

const DeleteProduct: any = function ({
  getProducts,
  product,
  setIsLoading,
}: any) {
  const [isOpen, setOpen] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:8080/boro-api/api/categories/${product._id}`);
      console.log("Product deleted successfully");
      await getProducts();
      setOpen(false);
      // Optionally, you can add a callback to refresh the product list or redirect
    } catch (error) {
      console.error("Error deleting product:", error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Button color="failure" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-2">
          <HiTrash className="text-lg" />
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
        <Modal.Header className="px-6 pb-0 pt-6">
          <span className="sr-only">Delete {product.name}</span>
        </Modal.Header>
        <Modal.Body className="px-6 pb-6 pt-0">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="text-7xl text-red-500" />
            <p className="text-xl text-gray-500">
              Are you sure you want to delete {product.name}?
            </p>
            <div className="flex items-center gap-x-3">
              <Button color="failure" onClick={handleDelete}>
                Delete
              </Button>
              <Button color="gray" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export const Pagination: FC = function () {
  return (
    <div className="sticky bottom-0 right-0 w-full items-center border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between">
      <div className="mb-4 flex items-center sm:mb-0">
        <a
          href="#"
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Previous page</span>
          <HiChevronLeft className="text-2xl" />
        </a>
        <a
          href="#"
          className="mr-2 inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Next page</span>
          <HiChevronRight className="text-2xl" />
        </a>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            1-20
          </span>
          &nbsp;of&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            2290
          </span>
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <a
          href="#"
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <HiChevronLeft className="mr-1 text-base" />
          Previous
        </a>
        <a
          href="#"
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Next
          <HiChevronRight className="ml-1 text-base" />
        </a>
      </div>
    </div>
  );
};

export default UserListPage;
