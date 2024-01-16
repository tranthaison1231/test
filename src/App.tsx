import { useCallback, useMemo, useState } from "react";
import Avatar from "./components/Avatar";
import Button from "./components/Button";
import Card from "./components/Card";
import { Design, Filter, Sales, Setting, Support } from "./components/Icon";
import PaymentStatusTag from "./components/PaymentStatusTag";
import Search from "./components/Search";
import Table from "./components/Table";
import { formatMoney } from "./utils/money";

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


const filterBySearch = (items: Employee[], search: string) => {
  return items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.salary.toString().toLowerCase().includes(search.toLowerCase()) ||
      item.department.toLowerCase().includes(search.toLowerCase())
  );
}

function App() {
  const [items, setItems] = useState(EMPLOYEES)
  const [search, setSearch] = useState("")
  const [selectedIds, setSelectedIds] = useState<string[]>([])

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
      },
      {
        id: 'paymentDate',
        title: 'Payment date',
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


  const filteredItems = useMemo(() => filterBySearch(items, search), [items, search]);

  return (
    <div className="p-11 bg-[#F4F5F8] h-screen">
      <Card>
        <div className="p-2 bg-[#F8FAFB] w-full flex justify-between mb-4">
          <Search
            placeholder="Search for employees, salary amounts.."
            className="w-[340px] h-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="space-x-2 flex">
            <Button className="px-4">
              <Filter />
              <span className="ml-1 text-slate-600 text-sm font-bold">Filters</span>
            </Button>
            <Button>
              <Setting />
            </Button>
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
