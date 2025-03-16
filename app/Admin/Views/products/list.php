<div class="product-grid">
    <div class="product-head">ID</div>
    <div class="product-head">NAME</div>
    <div class="product-head">IMAGE</div>
    <div class="product-head">STATUS</div>
    <div class="product-head">PRICE</div>
    <div class="product-head">CATEGORY</div>
    <div class="product-head">FUNCTION</div>

    <?php while ($row = $result->fetch_assoc()) { ?>
        <div class="product-items"> <?php echo $row['id']; ?> </div>
        <div class="product-items"> <?php echo $row['name']; ?> </div>
        <div class="product-items"><img src="<?php echo $row['image']; ?>" width="100" height="90" alt=""></div>
        <div class="product-items"><span class="in-stock"> <?php echo $row['status']; ?> </span></div>
        <div class="product-items"> <?php echo number_format($row['price']); ?> VND</div>
        <div class="product-items"> <?php echo $row['category']; ?> </div>
        <div class="product-items">
            <button onclick="editProduct('<?php echo $row['id']; ?>')">Edit</button>
            <button onclick="deleteProduct('<?php echo $row['id']; ?>')">Delete</button>
        </div>
    <?php } ?>
</div>

    


<!-- Edit Notification -->
<div class="notification edit-notification" id="editNotification">
    <h2>Edit Product</h2>
    <form>
        <label for="product_name">Product Name</label>
        <input type="text" id="product_name" name="product_name" value="Avocado Mousse">
        
        <label for="product_image">Product Image</label>
        <input type="file" id="product_image" name="product_image">
        <img src="../../Img/Mousse/Avocado_Mousse.jpg" width="100" height="75" alt="Current Image">

        <label for="product_status">Status</label>
        <select id="product_status" name="product_status">
            <option value="available" selected>Available</option>
            <option value="out-of-stock">Out of Stock</option>
        </select>

        <label for="product_price">Price</label>
        <input type="number" id="product_price" name="product_price" value="510000">

        <label for="product_category">Category</label>
        <input type="text" id="product_category" name="product_category" value="Mousse">

        <button type="submit" onclick="hideNotification('editNotification')">Save</button>
        <button type="button" onclick="hideNotification('editNotification')">Cancel</button>
    </form>
</div>
