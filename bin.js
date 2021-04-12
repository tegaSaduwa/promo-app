{
  /* <Row>
         <Col></Col>
        <Link to={`/admin/add-category`}>
          <Button
            color="dark"
            // style={{ backgroundColor: "purple" }}
            size="sm"
            color="info"
            className="mb-1"
          >
            + Add Category
          </Button>
        </Link>
        </Row> */
}
<span className="d-flex justify-content-start">
  <Link to={`/admin/add-category`}>
    <Button color="dark" size="sm" color="info" className="mb-2 mr-1">
      + Add Category
    </Button>
  </Link>

  <Link to={`/admin/add-category`}>
    <Button color="dark" size="sm" color="warning" className="mb-2">
      + Add Event
    </Button>
  </Link>
</span>;
