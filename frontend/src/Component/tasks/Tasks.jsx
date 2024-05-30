import React from 'react'
import Widget from '../../Helpers/Widget'
import PlansTable from './TasksTable'
const Plans = () => {
  return (
    <React.Fragment>
         <Widget.BreadcrumbDynamic title="Tasks" />
         <div className="table_view">
            <PlansTable />
        </div>
      </React.Fragment>
  )
}

export default Plans