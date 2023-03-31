import { useEffect, useState } from 'react';

import { Widget } from 'common/types/widgets';
import Table from 'common/components/Table';

export default function Admin() {
  const [widgets, setWidgets] = useState<Widget[]>([]);

  useEffect(() => {
    async function init() {
      try {
        const response = await fetch('/api/widgets');
        const { data } = await response.json();
        setWidgets(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }

    init();
  }, []);

  return (
    <div>
      <h1>Hello From Admin!</h1>
      <Table
        columns={['id', 'name', 'price']}
        rows={widgets}
      />
    </div>
  );
}
