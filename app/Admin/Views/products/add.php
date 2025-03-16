<form>

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
            <div class="id">
                <div class="product-head">Id</div>
                <div class="product-items"><input type="text"></div>
            </div>
            <div class="name">
                <div class="product-head">Name</div>
                <div class="product-items"><input type="text"></div>
            </div>
            <div class="price">
                <div class="product-head">Price</div>
                <div class="product-items"><input type="text"></div>
            </div>

        </div>
                            
        <div class="bottom">
            <div class="status">
                <div class="product-head">Status</div>
                <div class="product-items">
                    <select class="select" name="jumpMenu3" id="jumpMenu3">
                        <option selected="selected">--Select status--</option>
                        <option >In stock</option>
                        <option >Sold out</option>
                    </select>
                </div>
            </div>

            <div class="category">
                <div class="product-head">Category</div>
                <div class="product-items">
                    <select class="select" name="jumpMenu3" id="jumpMenu3">
                        <option selected="selected">--Select category--</option>
                        <option >Mousse</option>
                        <option >Croissant</option>
                        <option >Drink</option>
                    </select>
                </div>
            </div>

            <div class="capital">
                <div class="product-head">Size</div>
                <div class="product-items"><input type="number"></div>
            </div>
        </div>

    </div>

    <div class="product-pic">Insert Picture</div>
    <div class="items-pic">
        <label class="insert">
            <input type="button" value="Browse..." onclick="document.getElementById('fileInput').click();" />
            <ion-icon name="cloud-upload-outline"></ion-icon>
        </label>
            
        <input type="text" id="filePath" readonly />
        <input type="file" id="fileInput" style="display:none;" 
            onchange="
                const file = this.files[0];
                if (file) {
                    const uploadPath = 'uploads/' + file.name; 
                    document.getElementById('filePath').value = uploadPath;
                }
            " />

    </div>

    <div class="product-pic describe">Describe</div>
    <div class="write-describe">
        <textarea rows="6" cols="150" style="overflow:auto;"></textarea>
    </div>

    <div class="button-click">
        <button type="submit" class="save">
            save
            <ion-icon name="save-outline"></ion-icon>
        </button>

        <button  class="cancel">
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
            <button class="close" type="reset">close</button>
            <button class="go-to"><a href="./list-product.html">Go List Product</a></button>
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