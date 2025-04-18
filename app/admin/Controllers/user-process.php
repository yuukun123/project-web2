<?php
session_name("admin");
session_start();

include '../../config/data_connect.php';

// Lấy user hiện tại đang đăng nhập
$currentUser = $_SESSION['username'] ?? '';

$sql = "SELECT * FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0): ?>
    <table id="userTable">
        <thead>
            <tr>
                <th>Username</th>
                <th>Lastname</th>
                <th>Firstname</th>
                <th>Email</th>
                <th>Phone</th>
                <th class="hide2">Address</th>
                <th>Role</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php while($row = $result->fetch_assoc()):
                $user_name = $row['user_name'];
                $lastname = $row['last_name'];
                $firstname = $row['first_name'];
                $statusText = ($row['status'] === 'locked') ? 'Locked' : 'Active';
                $toggleAction = ($row['status'] === 'locked') ? 'Unlock' : 'Lock';
                $icon = ($row['status'] === 'locked') ? 'lock-open-outline' : 'lock-closed-outline';
                $isCurrentUser = ($user_name === $currentUser); // 👉 kiểm tra có phải chính mình không
            ?>
                <tr user_name="<?php echo $user_name; ?>">
                    <td><?php echo htmlspecialchars($user_name); ?></td>
                    <td><?php echo htmlspecialchars($firstname); ?></td>
                    <td><?php echo htmlspecialchars($lastname); ?></td>
                    <td><?php echo htmlspecialchars($row['email']); ?></td>
                    <td><?php echo htmlspecialchars($row['phone']); ?></td>
                    <td class="hide2">
                        <?php echo htmlspecialchars($row['street'] . ', ' . $row['ward'] . ', ' . $row['district'] . ', ' . $row['city']); ?>
                    </td>
                    <td><?php echo htmlspecialchars($row['role']); ?></td>

                    <td>
                        <button 
                            class="button lock <?php echo $isCurrentUser ? 'disabled' : ''; ?>" 
                            onclick="<?php echo !$isCurrentUser ? 'toggleLockUser(\'' . $user_name . '\', \'' . $row['status'] . '\')' : ''; ?>"
                            title="<?php echo $isCurrentUser ? 'You cannot lock your own account' : $toggleAction . ' this user'; ?>">
                            <ion-icon name="<?php echo $icon; ?>" style="color: black;"></ion-icon>
                        </button>

                        <button class="button edit" onclick="editUser('<?php echo $user_name; ?>')">
                            <ion-icon name="create-outline" style="color: black;"></ion-icon>
                        </button>
                    </td>
                </tr>
            <?php endwhile; ?>
        </tbody>
    </table>
<?php else: ?>
    <p>No users found.</p>
<?php endif; ?>  
