
<div class="add-more">
    <button class="add-user" onclick="showAddUserForm()">
        <ion-icon name="add-circle-outline"></ion-icon>
        add more users
    </button>
    <input class="find" type="text" placeholder="find user" />
</div>


<div id="userTableContainer">
    <!-- Phần table sẽ được load vào đây từ manager_processing.php -->
</div>

    <!-- Modal for adding/editing users -->
<div id="userModal">
    <div id="userFormContainer">
        <h2 style="text-align: center; margin-bottom: 30px" id="modalTitle">Edit User</h2>
        <div class="form-grid">
        <div class="form-group">
            <label for="user_id">User ID:</label>
            <input type="text" id="user_id" disabled />
        </div>
        <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" placeholder="Enter username" />
        </div>
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter email" />
        </div>
        <div class="form-group">
            <label for="phone">Phone:</label>
            <input type="text" id="phone" name="phone" placeholder="Enter phone" />
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="text" id="password" name="password" placeholder="Enter password" />
        </div>
        <div class="form-group">
            <label for="city">City:</label>
            <select id="city" name="city" onchange="loadDistricts()">
                <option value="">Select city</option>
            </select>
        </div>
        <div class="form-group">
            <label for="district">District:</label>
            <select id="district" name="district" onchange="loadWards()">
                <option value="">Select district</option>
            </select>
        </div>
        <div class="form-group">
            <label for="ward">Ward:</label>
            <select id="ward" name="ward" >
                <option value="">Select ward</option>
            </select>
        </div>

        <div class="form-group">
            <label for="street">Street:</label>
            <input type="text" id="street" name="street" placeholder="Enter street" />
        </div>
        <div class="form-group">
            <label for="role">Role:</label>
            <input type="text" id="role" name="role" placeholder="Enter role" />
        </div>
        <div class="form-group">
            <label for="created_at">Created At:</label>
            <input type="text" id="created_at" disabled />
        </div>
        <div class="form-group">
            <label for="updated_at">Updated At:</label>
            <input type="text" id="updated_at" disabled />
        </div>
        </div>
        <div class="modal-buttons">
            <button class="save-btn" onclick="saveUser()">Save</button>
            <button class="close-btn" onclick="closeModal()">Cancel</button>
        </div>
    </div>
</div>



<!-- Confirmation Modal for Lock -->
<div id="confirmLockModal" style="display: none">
    <div class="modal-content">
    <div class="modal-header">
        <span class="warning-icon">&#10060;</span>
    </div>
    <h2>Warning</h2>
    <p>Are you sure you want to lock/unlock this user?</p>
    <div class="modal-buttons">
        <button id="confirmLockBtn" class="yes-button">Yes</button> 
        <button class="no-button" onclick="closeConfirmModal()">No</button>
    </div>
    </div>
</div>