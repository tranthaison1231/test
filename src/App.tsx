import { useCallback, useMemo, useState } from "react";
import { Avatar } from "./components/Avatar";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { Design, Filter, Sales, Setting, Support } from "./components/Icon";
import { PaymentStatusTag, PaymentStatus } from './components/PaymentStatusTag/PaymentStatusTag';
import { Search } from "./components/Search";
import Table from "./components/Table/Table";
import { formatMoney } from "./utils/money";
import clsx from 'clsx'
import { Popover } from "./components/Popover";

const EMPLOYEES = [
  {
    id: '1',
    name: 'Victor Pacheco',
    department: 'Sales',
    departmentIcon: <Sales />,
    salary: 40000,
    paymentDate: 'Yesterday',
    paymentStatus: 'pending',
    details: 'Capture payment details',
  },
  {
    id: '2',
    name: 'Charlotte Spencer',
    department: 'Support',
    departmentIcon: <Support />,
    salary: 95000,
    paymentDate: 'In 2 days',
    paymentStatus: 'pending',
    details: 'No remarks',
  },
  {
    id: '3',
    name: 'Annette Black',
    department: 'Design',
    departmentIcon: <Design />,
    salary: 95000,
    paymentDate: '22/02/2021',
    paymentStatus: 'failed',
    details: 'Please forward this information to...',
  },
  {
    id: '4',
    name: 'Jerome Bell',
    department: 'Sales',
    departmentIcon: <Sales />,
    salary: 85000,
    paymentDate: '22/02/2021',
    paymentStatus: 'done',
    details: 'Request confirmation.',
  },
  {
    id: '5',
    name: 'Jenny Wilson',
    department: 'Sales',
    departmentIcon: <Sales />,
    salary: 34000,
    paymentDate: '22/02/2021',
    paymentStatus: 'done',
    details: 'No remarks',
  },
  {
    id: '6',
    name: 'Albert Flores',
    department: 'Sales',
    departmentIcon: <Sales />,
    salary: 22000,
    paymentDate: '22/02/2021',
    paymentStatus: 'done',
    details: 'Received confirmation',
  },
  {
    id: '7',
    name: 'Arlene McCoy',
    department: 'Sales',
    departmentIcon: <Sales />,
    salary: 22000,
    paymentDate: '22/02/2021',
    paymentStatus: 'done',
    details: 'Submitted a report',
  },
];

type Employee = typeof EMPLOYEES[0];


interface Filter {
  paymentStatus: string
  department: string
}

const filterItem = (items: Employee[], { search , filter}: { search: string, filter: Filter}) => {
  return items.filter(
    (item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.salary.toString().toLowerCase().includes(search.toLowerCase()) ||
        item.department.toLowerCase().includes(search.toLowerCase());

      let matchesFilter = true;

      if(filter.paymentStatus !== 'All') {
        matchesFilter = matchesFilter && item.paymentStatus === filter.paymentStatus;
      }

      if(filter.department !== 'All') {
        matchesFilter = matchesFilter && item.department === filter.department;
      }
      
      return matchesSearch && matchesFilter;
    }
  );
};

function App() {
  const [items, setItems] = useState(EMPLOYEES)
  const [search, setSearch] = useState("")
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [filter, setFilter] = useState({
    paymentStatus: 'All',
    department: 'All',
  });

  const columns = useMemo(
    () => [
      {
        id: 'name',
        title: 'Employee',
        render: (column: Employee) => (
          <div className="flex gap-2 items-center">
            <Avatar name={column.name} />
            <span>{column.name}</span>
          </div>
        ),
      },
      {
        id: 'department',
        title: 'Department',
        render: (column: Employee) => (
          <div className="flex gap-2 items-center">
            {column.departmentIcon}
            <span className="text-slate-500"> {column.department}</span>
          </div>
        ),
      },
      {
        id: 'salary',
        title: 'Salary',
        render: (column: Employee) => <span>{formatMoney(column.salary)}</span>,
        sortable: true,
      },
      {
        id: 'paymentDate',
        title: 'Payment date',
        render: (column: Employee) => (
          <div className="flex gap-2 items-center">
            <div
              className={clsx('w-2 h-2 rounded-full', {
                'bg-rose-500': column.paymentDate === 'Yesterday',
                'bg-orange-400': column.paymentDate === 'In 2 days',
                'bg-green-600': column.paymentDate === '22/02/2021',
              })}
            />
            <span>{column.paymentDate}</span>
          </div>
        ),
      },
      {
        id: 'paymentStatus',
        title: 'Payment Status',
        render: (column: Employee) => <PaymentStatusTag status={column.paymentStatus} />,
      },
      {
        id: 'details',
        title: 'Details',
      },
    ],
    []
  );

  const handleArchive = useCallback(() => {
    if(selectedIds.length > 0) {
      setItems(items.filter(item => !selectedIds.includes(item.id)))
      setSelectedIds([])
    }
  }, [selectedIds])


  const filteredItems = useMemo(() => filterItem(items, {
    search,
    filter
  }), [items, search, filter]);

  return (
    <div className="p-11 bg-[#F4F5F8] h-screen">
      <Card className="p-0">
        <div className="p-4">
          <div className="p-2.5 bg-[#F8FAFB] w-full flex justify-between mb-4">
            <Search
              placeholder="Search for employees, salary amounts.."
              className="w-[340px] h-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="space-x-2 flex">
              <Popover
                content={
                  <div className="w-80 p-4 h-18 space-y-4">
                    <div className="flex justify-between">
                      <span>Payment Status:</span>
                      <select
                        className="h-6 border w-24"
                        value={filter.paymentStatus}
                        onChange={(e) => setFilter({ ...filter, paymentStatus: e.target.value })}
                      >
                        <option value="All">All</option>
                        <option value={PaymentStatus.PENDING}>Pending</option>
                        <option value={PaymentStatus.FAILED}>Failed</option>
                        <option value={PaymentStatus.DONE}>Done</option>
                      </select>
                    </div>
                    <div className="flex justify-between">
                      <span>Department:</span>
                      <select
                        className="h-6 border w-24"
                        value={filter.department}
                        onChange={(e) => setFilter({ ...filter, department: e.target.value })}
                      >
                        <option value="All">All</option>
                        <option value="Sales">Sales</option>
                        <option value="Support">Support</option>
                        <option value="Design">Design</option>
                      </select>
                    </div>
                  </div>
                }
              >
                <Button className="px-4">
                  <Filter />
                  <span className="ml-1 text-slate-600 text-sm font-bold">Filters</span>
                </Button>
              </Popover>
              <Button>
                <Setting />
              </Button>
            </div>
          </div>
        </div>
        <Table<Employee>
          columns={columns}
          items={filteredItems}
          selectedIds={selectedIds}
          onSelect={(ids) => setSelectedIds(ids)}
          onArchive={handleArchive}
        />
      </Card>
    </div>
  );
}

export default App;
