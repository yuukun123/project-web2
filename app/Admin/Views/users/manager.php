<div class="add-more">
    <button class="add-user" onclick="showAddUserForm()">
        <ion-icon name="add-circle-outline"></ion-icon>
        add more users
    </button>
    <input class="find" type="text" placeholder="find user" />
</div>

<table id="userTable" >
    <thead>
        <tr>
        <th>ID</th>
        <th>Username</th>
        <th>Email</th>
        <th class="hide1">Password</th>
        <th class="hide2">Address</th>
        <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <!-- User rows will be added dynamically here -->
    </tbody>
</table>

    <!-- Modal for adding/editing users -->
<div id="userModal">
    <div id="userFormContainer">
        <h2 style="text-align: center; margin-bottom: 30px" id="modalTitle" > Add User </h2>

        <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" placeholder="Enter username" />
        </div>
        <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" placeholder="Enter email" />
        </div>
        <div class="form-group">
        <label for="password">Password:</label>
        <input type="text" id="password" placeholder="Enter password" />
        </div>
        <div class="form-group">
        <label for="address">Address:</label>
        <input type="text" id="address" placeholder="Enter address" />
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