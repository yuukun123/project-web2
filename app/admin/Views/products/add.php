<form id="add-product-form" action="../../Controllers/add-product-process.php" method="post" enctype="multipart/form-data">
    <div class="add-more">
        <button class="add-category">
            <ion-icon name="add-circle-outline"></ion-icon>
            add more category
        </button>
        <button class="add-status">
            <ion-icon name="add-circle-outline"></ion-icon>
            add more status
        </button>
    </div>

    <div class="product-grid">

        <div class="top">
            <!-- <div class="id">
                <div class="product-head">Id</div>
                <div class="product-items"><input type="text"></div>
            </div> -->
            <div class="name">
                <div class="product-head">Name</div>
                <div class="product-items"><input type="text" name="name" id="name" required></div>
            </div>
            <div class="price">
                <div class="product-head">Price</div>
                <div class="product-items"><input type="text" name="price" id="price" required></div>
            </div>
            <div class="status">
                <div class="product-head">Status</div>
                <div class="product-items">
                <select class="select" name="status" id="status" required>
                    <option value="" disabled selected>--Select status--</option>
                    <option value="Available">Available</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Discontinued">Discontinued</option>
                </select>
                </div>
            </div>

        </div>
                            
        <div class="bottom">
            <div class="category">
                <div class="product-head">Category</div>
                <div class="product-items">
                    <select class="select" name="category" id="category" required>
                        <option selected="selected">--Select category--</option>
                        <option >Mousse</option>
                        <option >Croissant</option>
                        <option >Drink</option>
                    </select>
                </div>
            </div>

            <div class="capital">
                <div class="product-head">Size</div>
                <div class="product-items">
                    <select class="select" name="size" id="size" required>
                        <option selected="selected">--Select size--</option>
                    </select>
                </div>
            </div>

            <div class="expiration-date">
                <div class="product-head">Expiration date</div>
                <div class="product-items">
                    <input type="date" name="expiration_date" id="expiration_date" required>
                </div>
            </div>
        </div>

        <div class="storage">
            <div class="product-head">Storage</div>
            <div class="product-items">
                <input type="text" name="storage" id="storage" required>
            </div>
        </div>

    </div>
    
    <div class="items-pic-3">
        <div class="items-pic">
            <div class="product-pic">Insert Picture</div>
            <label class="insert">
                <input type="button" value="Browse..." onclick="document.getElementById('fileInput').click();" />
                <!-- <ion-icon name="cloud-upload-outline"></ion-icon> -->
            </label>
            <input type="text" id="filePath" name="filePath" readonly />
            <input type="file" id="fileInput" name="image" style="display:none;" />
            <div class="product-pic describe">Ingredients</div>
            <div class="write-describe">
                
                <textarea name="ingredient" id="ingredient" rows="6" cols="145" style="overflow:auto;" required></textarea>
            </div>
        </div>

        <div class="imgPreview">
            <img id="imagePreview" />
        </div>

    </div>



    <div class="button-click">
        <button type="submit" class="save">
            save
            <ion-icon name="save-outline"></ion-icon>
        </button>

        <button  class="cancel" type="reset">
            Cancel
            <ion-icon name="close-outline"></ion-icon>
        </button>
    </div>

    <div class="save-success">
        <div class="icon-suc">
            <ion-icon name="checkmark-circle-outline"></ion-icon>
        </div>
        <div class="text">
            <h1>Successfully</h1>
            <p>Your product added successfully. If you want to stay, press <span style="color: red;">"close"</span> or go to the product list page by pressing <span style="color: blue;">"go list product"</span>.</p>

        </div>
        
        <div class="button1">
            <button class="close" id="productForm" type="reset">close</button>
            <button class="go-to"><a href="list-product">Go List Product</a></button>
        </div>
    </div>

    <div class="cancel-success">
        <div class="icon-suc2">
            <ion-icon name="close-circle-outline"></ion-icon>
        </div>
        <div class="text2">
            <h1>Warning</h1>
            <p>Are you sure you want to cancel?</p>
        </div>
        <div class="button2">
            <input type="reset" class="close2" name="yes" id="button1" value="Yes" />
            <input type="button" class="close2" name="no" id="button2" value="No" />
        </div>
    </div>
</form>