import {
  Users,
  RefreshCw,
  UserRoundPlus,
} from "lucide-react";

import CustomersGrid from "../components/customers/CustomersGrid";
import CustomerDetailsModal from "../components/customers/CustomerDetailsModal";
import AddCustomerModal from "../components/customers/AddCustomerModal";
import Button from "../components/ui/Button";

import useCustomers from "../hooks/customers/useCustomers";

const CustomersPage = () => {
  const {
    customers,
    loading,
    refreshing,
    error,
    search,
    currentPage,
    totalPages,
    totalItems,
    selectedCustomer,
    detailsLoading,
    detailsError,
    isAddCustomerOpen,
    addCustomerLoading,
    addCustomerError,
    refresh,
    setSearch,
    setPage,
    resetFilters,
    handleViewCustomer,
    handleCloseDetails,
    handleOpenAddCustomer,
    handleCloseAddCustomer,
    handleAddCustomer,
  } = useCustomers();

  return (
    <div>
      {/* Page Header */}
      <div
        className="
          flex flex-col gap-4
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div>
          <div className="flex items-center gap-2">
            <div
              className="
                flex h-9 w-9
                items-center justify-center
                rounded-xl
                bg-slate-900
                dark:bg-white
              "
            >
              <Users
                size={18}
                className="
                  text-white
                  dark:text-slate-900
                "
              />
            </div>

            <h1
              className="
                text-2xl
                font-bold
                tracking-tight
                text-slate-900
                dark:text-white
                sm:text-3xl
              "
            >
              Customers
            </h1>
          </div>

          <p
            className="
              mt-1.5
              text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            Manage and monitor registered customers.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          {/* Add Customer */}
          <Button
            variant="primary"
            icon={UserRoundPlus}
            onClick={handleOpenAddCustomer}
          >
            Add Customer
          </Button>

          {/* Refresh */}
          <Button
            variant="secondary"
            icon={RefreshCw}
            loading={refreshing}
            onClick={refresh}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Customers */}
      <div className="mt-6">
        <CustomersGrid
          customers={customers}
          loading={loading}
          error={error}
          onRetry={refresh}
          search={search}
          onSearchChange={setSearch}
          onReset={resetFilters}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          onPageChange={setPage}
          onView={handleViewCustomer}
        />
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <CustomerDetailsModal
          customer={selectedCustomer}
          loading={detailsLoading}
          error={detailsError}
          onClose={handleCloseDetails}
        />
      )}

      {/* Add Customer Modal */}
      {isAddCustomerOpen && (
        <AddCustomerModal
          isOpen={isAddCustomerOpen}
          onClose={handleCloseAddCustomer}
          onSubmit={handleAddCustomer}
          loading={addCustomerLoading}
          error={addCustomerError}
        />
      )}

      {/* Live Status */}
      <div
        className="
          mt-5
          flex items-center
          justify-end
          gap-2
          text-xs
          text-slate-400
          dark:text-slate-500
        "
      >
        <span
          className="
            h-1.5 w-1.5
            rounded-full
            bg-emerald-500
          "
        />

        <span>
          Customer data refreshes automatically
        </span>
      </div>
    </div>
  );
};

export default CustomersPage;