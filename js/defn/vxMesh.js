var MeshType = {
    Solid: 0,
    Lines: 1
};

function vxMesh () {
  
  //Mesh Name
    this.Name = "object:name";
    

    this.meshcolor = new vxColour(0.75, 0.5, 0.05, 1);

    //Vertice Array
    this.mesh_vertices = [];
    this.edgevertices = [];
    
    //Normal Array
    this.vert_noramls = [];
    this.edge_noramls = [];
    
    //Colour Array
    this.vert_colours = [];
    this.wire_colours = [];
    this.edge_colours = [];
    
    //Selection Colour Array
    this.vert_selcolours = [];

    //Indices
    this.Indices = [];
    this.EdgeIndices = [];
    
    //Buffers
    this.meshVerticesBuffer = null;
    this.meshVerticesNormalBuffer= null;
    this.meshVerticesColorBuffer= null;
    this.meshVerticesSelectionColorBuffer= null;
    this.meshVerticesWireframeColorBuffer= null;
    this.meshVerticesIndexBuffer= null;
    
    this.edgeVerticesBuffer = null;
    this.edgeVerticesNormalBuffer= null;
    this.edgeVerticesColorBuffer= null;
    this.edgeVerticesIndexBuffer= null;

    //What is the model type
    this.meshType = MeshType.Solid;
    
    //Should it be Drawn
    this.Enabled = true;
}

vxMesh.prototype.getInfo = function() {
    return 'Mesh Name: ' + this.Name;
};

vxMesh.prototype.InitialiseBuffers = function(){
  
  this.meshVerticesBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.meshVerticesBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.mesh_vertices), gl.STATIC_DRAW);
  
    // Set up the normals for the vertices, so that we can compute lighting.
  this.meshVerticesNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.meshVerticesNormalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vert_noramls), gl.STATIC_DRAW);
  
  // Now set up the colors
  this.meshVerticesColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.meshVerticesColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vert_colours), gl.STATIC_DRAW);

  this.meshVerticesSelectionColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.meshVerticesSelectionColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vert_selcolours), gl.STATIC_DRAW);


  // Now set up the colors
  this.meshVerticesWireframeColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.meshVerticesWireframeColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.wire_colours), gl.STATIC_DRAW);

  // Build the element array buffer; this specifies the indices
  // into the vertex array for each face's vertices.
  this.meshVerticesIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.meshVerticesIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.Indices), gl.STATIC_DRAW);




// Edge Buffers
//*************************************************************************************
    this.edgeVerticesBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.edgeVerticesBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.edgevertices), gl.STATIC_DRAW);
  
    // Set up the normals for the vertices, so that we can compute lighting.
  this.edgeVerticesNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.edgeVerticesNormalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.edge_noramls), gl.STATIC_DRAW);
  
  // Now set up the colors
  this.edgeVerticesColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.edgeVerticesColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.edge_colours), gl.STATIC_DRAW);





  // Build the element array buffer; this specifies the indices
  // into the vertex array for each face's vertices.
  this.edgeVerticesIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.edgeVerticesIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.EdgeIndices), gl.STATIC_DRAW);
};

vxMesh.prototype.DrawSelPreProc = function(){

  if(this.Enabled == true){


  // Draw the mesh by binding the array buffer to the mesh's vertices
  // array, setting attributes, and pushing it to GL.
  gl.bindBuffer(gl.ARRAY_BUFFER, this.meshVerticesBuffer );
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    // Bind the normals buffer to the shader attribute.
  gl.bindBuffer(gl.ARRAY_BUFFER, this.meshVerticesNormalBuffer);
  gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
  
  // Set the colors attribute for the vertices.
  gl.bindBuffer(gl.ARRAY_BUFFER, this.meshVerticesSelectionColorBuffer);
  gl.vertexAttribPointer(vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
  
  // Draw the cube.
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.meshVerticesIndexBuffer);
  
  setMatrixUniforms();
    
    if(this.meshType == MeshType.Solid){
      gl.drawElements(gl.TRIANGLES, this.Indices.length, gl.UNSIGNED_SHORT, 0);
    }
  }

};


vxMesh.prototype.Draw = function(){
  
  if(this.Enabled == true){

  // Draw the mesh by binding the array buffer to the mesh's vertices
  // array, setting attributes, and pushing it to GL.
  gl.bindBuffer(gl.ARRAY_BUFFER, this.meshVerticesBuffer );
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    // Bind the normals buffer to the shader attribute.
  gl.bindBuffer(gl.ARRAY_BUFFER, this.meshVerticesNormalBuffer);
  gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
  
  // Set the colors attribute for the vertices.
  gl.bindBuffer(gl.ARRAY_BUFFER, this.meshVerticesColorBuffer);
  gl.vertexAttribPointer(vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
  
  // Draw the cube.
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.meshVerticesIndexBuffer);
  
  setMatrixUniforms();
  if(this.meshType == MeshType.Solid){
    gl.drawElements(gl.TRIANGLES, this.Indices.length, gl.UNSIGNED_SHORT, 0);
  }
  if(this.meshType == MeshType.Lines){
    gl.drawElements(gl.LINES, this.Indices.length, gl.UNSIGNED_SHORT, 0);
  }
  }
};

// Draws the Edge Mesh with using the Mesh Colours
vxMesh.prototype.DrawWireframe = function(){
  
  if(this.Enabled == true){

  if(this.meshType == MeshType.Solid){
  // Draw the mesh by binding the array buffer to the mesh's vertices
  // array, setting attributes, and pushing it to GL.
  gl.bindBuffer(gl.ARRAY_BUFFER, this.edgeVerticesBuffer );
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    // Bind the normals buffer to the shader attribute.
  gl.bindBuffer(gl.ARRAY_BUFFER, this.edgeVerticesNormalBuffer);
  gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
  
  // Set the colors attribute for the vertices.
  gl.bindBuffer(gl.ARRAY_BUFFER, this.meshVerticesWireframeColorBuffer);
  gl.vertexAttribPointer(vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
  
  // Draw the cube.
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.edgeVerticesIndexBuffer);
  
  setMatrixUniforms();

  gl.drawElements(gl.LINES, this.EdgeIndices.length, gl.UNSIGNED_SHORT, 0);

  }
  }
};


vxMesh.prototype.DrawEdge = function(){
  
  if(this.Enabled == true){

  if(this.meshType == MeshType.Solid){
  // Draw the mesh by binding the array buffer to the mesh's vertices
  // array, setting attributes, and pushing it to GL.
  gl.bindBuffer(gl.ARRAY_BUFFER, this.edgeVerticesBuffer );
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    // Bind the normals buffer to the shader attribute.
  gl.bindBuffer(gl.ARRAY_BUFFER, this.edgeVerticesNormalBuffer);
  gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
  
  // Set the colors attribute for the vertices.
  gl.bindBuffer(gl.ARRAY_BUFFER, this.edgeVerticesColorBuffer);
  gl.vertexAttribPointer(vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
  
  // Draw the cube.
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.edgeVerticesIndexBuffer);
  
  setMatrixUniforms();

  gl.drawElements(gl.LINES, this.EdgeIndices.length, gl.UNSIGNED_SHORT, 0);

  }
}
};

vxMesh.prototype.AddVertices = function(vertices, normal, colour, encodedIndexColor){
 
         this.mesh_vertices.push(vertices.X);
         this.mesh_vertices.push(vertices.Y);
         this.mesh_vertices.push(vertices.Z);
  
         this.vert_noramls.push(normal.X);
         this.vert_noramls.push(normal.Y);
         this.vert_noramls.push(normal.Z);
         
         
         this.vert_colours.push(colour.R);
         this.vert_colours.push(colour.G);
         this.vert_colours.push(colour.B);
         this.vert_colours.push(colour.A);

         //Set Selection Colour
         this.vert_selcolours.push(encodedIndexColor.R);
         this.vert_selcolours.push(encodedIndexColor.G);
         this.vert_selcolours.push(encodedIndexColor.B);
         this.vert_selcolours.push(encodedIndexColor.A);

         //Increment Indicies
         this.Indices.push(this.Indices.length);
};

vxMesh.prototype.AddFace = function(vert1, vert2, vert3, normal, colour, encodedIndexColor){
    
  this.AddVertices(vert1, normal, colour, encodedIndexColor);
  this.AddVertices(vert2, normal, colour, encodedIndexColor);
  this.AddVertices(vert3, normal, colour, encodedIndexColor);

  this.AddEdge(vert1, vert2);
  this.AddEdge(vert2, vert3);
  this.AddEdge(vert3, vert1);
};

vxMesh.prototype.AddEdge = function(vert1, vert2){

  this.edgevertices.push(vert1.X);
  this.edgevertices.push(vert1.Y);
  this.edgevertices.push(vert1.Z);

  this.edgevertices.push(vert2.X);
  this.edgevertices.push(vert2.Y);
  this.edgevertices.push(vert2.Z);

  this.edge_noramls.push(1);
  this.edge_noramls.push(0);
  this.edge_noramls.push(0);
  this.edge_noramls.push(1);
  this.edge_noramls.push(0);
  this.edge_noramls.push(0);

  this.edge_colours.push(0);
  this.edge_colours.push(0);
  this.edge_colours.push(0);
  this.edge_colours.push(1);
  this.edge_colours.push(0);
  this.edge_colours.push(0);
  this.edge_colours.push(0);
  this.edge_colours.push(1);


  this.wire_colours.push(this.meshcolor.R);
  this.wire_colours.push(this.meshcolor.G);
  this.wire_colours.push(this.meshcolor.B);
  this.wire_colours.push(1);
  this.wire_colours.push(this.meshcolor.R);
  this.wire_colours.push(this.meshcolor.G);
  this.wire_colours.push(this.meshcolor.B);
  this.wire_colours.push(1);


  this.EdgeIndices.push(this.EdgeIndices.length);
  this.EdgeIndices.push(this.EdgeIndices.length);

  };